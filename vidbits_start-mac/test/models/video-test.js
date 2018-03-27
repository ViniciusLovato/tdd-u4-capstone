const Video = require('../../models/video');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');


describe('Model: Video', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('title', () => {
    it('should be a string', async () => {
      const nonStringTitle = 1;
      const video = {
        title: nonStringTitle
      }

      const createdVideo = new Video(video);
      assert.strictEqual(createdVideo.title, nonStringTitle.toString());
    });

    it('should be a required field', async () => {
      const video = new Video({title: ''});
      video.validateSync();
      assert.strictEqual(video.errors.title.message, 'Path `title` is required.');
    })
  });

  describe('description', () => {
    it('should be a string', async () => {
      const nonStringTitle = 1;
      const video = {
        description: nonStringTitle
      }

      const createdVideo = new Video(video);
      assert.strictEqual(createdVideo.description, nonStringTitle.toString());
    });

    it('should be a required field', async () => {
      const video = new Video({description: ''});
      video.validateSync();
      assert.strictEqual(video.errors.description.message, 'Path `description` is required.');
    })
  });

  describe('videoUrl', () => {
    it('should be a string', async () => {
      const nonStringTitle = 1;
      const video = {
        videoUrl: nonStringTitle
      }

      const createdVideo = new Video(video);
      assert.strictEqual(createdVideo.videoUrl, nonStringTitle.toString());
    });

    it('should be a required field', async () => {
      const video = new Video({videoUrl: ''});
      video.validateSync();
      assert.strictEqual(video.errors.videoUrl.message, 'Path `videoUrl` is required.');
    })
  });
});
