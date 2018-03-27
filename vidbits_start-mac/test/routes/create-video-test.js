const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const Video = require('../../models/video');

const app = require('../../app');

const {parseTextFromHTML, seedVideoToDatabase, findIFrameElementBySource, buildVideoObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /create', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('POST', () => {
    it('save video and redirect', async () => {
      // setup
      const video = buildVideoObject();

      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(video);

        // verify for redirect status code
        assert.equal(response.status, 302);
    });

    it('save the video to the database', async () => {
      // setup
      const video = buildVideoObject();

      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(video);

              
      const addedVideo = await Video.findOne(video);
      assert.isNotNull(addedVideo);
      assert.isNotNull(addedVideo.videoUrl);
    });

    it('video without title should not be saved', async () => {
      const video = {
        description: 'A video description'
      }

      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(video);

      assert.deepEqual(await Video.find({}), []);
      assert.equal(response.status, 400);
    });


    it('video without title should keep other fields', async () => {
      const video = {
        description: 'A video description',
        videoUrl: 'https://www.youtube.com/embed/zw47_q9wbBE'        
      }

      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(video);

      assert.deepEqual(await Video.find({}), []);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), video.description);
      assert.include(parseTextFromHTML(response.text, 'form'), video.videoUrl);
    });

    it('video with input errors should show validation error messages', async () => {
      const video = {}

      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(video);

      assert.deepEqual(await Video.find({}), []);
      assert.equal(response.status, 400);      
      assert.include(parseTextFromHTML(response.text, 'form'), 'Path `title` is required');
      assert.include(parseTextFromHTML(response.text, 'form'), 'Path `description` is required');
      assert.include(parseTextFromHTML(response.text, 'form'), 'Path `videoUrl` is required');
    });
  });
});
