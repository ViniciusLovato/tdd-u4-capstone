const {assert} = require('chai');
const {buildVideoObject, createVideoUsingForm} = require('../test-utils');


describe('user visits the create page', () =>{
  describe('posts a new video', () => {
    it('should redirect the user to details page', () => {
      // setup
      const video = buildVideoObject();

      createVideoUsingForm(video, browser);

      // verify
      assert.include(browser.getText('#video-detail-container'), video.title);
      assert.include(browser.getText('#video-detail-container'), video.description);
      assert.include(browser.getAttribute('#video-detail-container iframe', 'src'), video.videoUrl);
      
    });
  });
});

