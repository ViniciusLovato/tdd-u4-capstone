const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders a video with a title and description', async () => {

      // creates a video in the database
      const video = await seedVideoToDatabase();

      // request the index page
      const response = await request(app)
      .get(`/videos`);

      // video should be included in the landing page
      assert.include(parseTextFromHTML(response.text, '.video-title'), video.title);
      assert.include(parseTextFromHTML(response.text, '.video-description'), video.description);  
          
    });

  });


  
});
