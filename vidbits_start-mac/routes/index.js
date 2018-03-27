const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('index', { videos });
});

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('index', { videos });
});

// Add additional routes below:
router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});

router.post('/videos/create', async (req, res, next) => {
  
  const { title, description, videoUrl } = req.body;
  const video = new Video({ title, description, videoUrl });
  
  video.validateSync();
  if(video.errors){
    res.status(400).render('videos/create', { video });
  }
  else {
    await video.save();
    res.redirect(`/videos/${video._id}`);
  }
});

router.get('/videos/:id', async (req, res, next) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);

  res.render('videos/show', { video });
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);

  res.render('videos/update', { video });
});

router.post('/videos/:id/update', async (req, res, next) => {

  const videoId = req.params.id;  
  const { title, description, videoUrl } = req.body;
  const video = new Video({ title, description, videoUrl });

  video.validateSync();
  if(video.errors){
    res.status(400).render('videos/create', { video });
  }
  else {
    await Video.findByIdAndUpdate(videoId,{title, description, videoUrl})
    res.redirect('/');

  }
});

router.post('/videos/:id/delete', async (req, res, next) => {
  const videoId = req.params.id;
  await Video.findByIdAndRemove(videoId);
  res.redirect('/');
});


module.exports = router;
