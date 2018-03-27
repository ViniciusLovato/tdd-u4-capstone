const {assert} = require('chai');
const request = require('supertest');
const Video = require('../../models/video');


const app = require('../../app');

const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id/edit', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders the correct video', async () => {
      const video = await seedVideoToDatabase();

      const response = await request(app)
      .get(`/videos/${video._id}/edit`);
      
      assert.include(response.text, video.title);
      assert.include(response.text, video.description);
      assert.include(response.text, video.videoUrl);
    
    });


  });

  describe('POST', () => {
    it('updates the correct video and redirects to landing page', async () => {
      const video = await seedVideoToDatabase();

      const updateProperties = {
        title: video.title,
        description: 'new description',
        videoUrl: video.videoUrl
      }

      const response = await request(app)
      .post(`/videos/${video._id}/update`)
      .type('form')
      .send(updateProperties);

      const updatedVideo = await Video.findById(video._id);
      assert.strictEqual(updatedVideo.description, updateProperties.description);
      assert.strictEqual(response.status, 302);

    })

    it('does not update an invalid record', async () => {
      const video = await seedVideoToDatabase();

      // Setup an invalid record
      const updateProperties = {
        title: '',
        description: '',
        videoUrl: ''
      }

      const response = await request(app)
      .post(`/videos/${video._id}/update`)
      .type('form')
      .send(updateProperties);

      const updatedVideo = await Video.findById(video._id);
      
      // Check if the record was not saved
      assert.strictEqual(updatedVideo.title, video.title);
      assert.strictEqual(updatedVideo.description, video.description);
      assert.strictEqual(updatedVideo.videoUrl, video.videoUrl);

      // Check the error status
      assert.strictEqual(response.status, 400);

      // Should display on the edit page the missing fields
      assert.include(parseTextFromHTML(response.text, 'form'), 'Path `title` is required');
      assert.include(parseTextFromHTML(response.text, 'form'), 'Path `description` is required');
      assert.include(parseTextFromHTML(response.text, 'form'), 'Path `videoUrl` is required');

    })
  })

});
