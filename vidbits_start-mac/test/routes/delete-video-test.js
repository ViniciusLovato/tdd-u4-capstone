const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, buildItemObject, seedVideoToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');


describe('Server path: /videos/:videoId/delete', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('POST', () => {
    it('deletes an video from the database', async () => {
      const video = await seedVideoToDatabase();

      const response = await request(app)
      .post(`/videos/${video._id}/delete`);

      const videoFound = await Video.findById(video._id);

      assert.isNull(videoFound);
      
    })
  })


});
