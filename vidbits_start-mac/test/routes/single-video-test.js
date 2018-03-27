const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const Video = require('../../models/video');


const app = require('../../app');

const {parseTextFromHTML, seedVideoToDatabase, findIFrameElementBySource} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders the correct video', async () => {
      const video = await seedVideoToDatabase();

      const response = await request(app)
      .get(`/videos/${video._id}`);
      
      assert.include(response.text, video.title);
      assert.include(response.text, video.description);
      const videoElement = findIFrameElementBySource(response.text, video.videoUrl);
      assert.equal(videoElement.src, video.videoUrl);      
    });
  });


});
