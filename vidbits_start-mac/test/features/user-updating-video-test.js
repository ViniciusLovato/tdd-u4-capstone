const {assert} = require('chai');
const {buildVideoObject, createVideoUsingForm} = require('../test-utils');


describe('user visits the show details page', () =>{
  describe('edit the video', () => {
    it('should update the info and redirect', () => {
      // setup
      const video = buildVideoObject();
      const newTitle = 'A new title'

      createVideoUsingForm(video, browser);
  
      // user will be redirected to show page
      // verify
      assert.include(browser.getText('#video-detail-container'), video.title);
      assert.include(browser.getText('#video-detail-container'), video.description);
      assert.include(browser.getAttribute('#video-detail-container iframe', 'src'), video.videoUrl);
      
      // click the edit link
      browser.click('.edit-button');

      // set the new title value
      browser.setValue('input[id=title-input]', newTitle);
      browser.click('button[type=submit]');

      // user will be redirected to show page but we want the landing page to check all videos
      browser.url('/videos');

      // verify
      assert.include(browser.getText('#videos-container'), newTitle);
    });

    it('should not create a new video', () => {
      // setup
      const video = buildVideoObject();
      const newTitle = 'A new title'

      createVideoUsingForm(video, browser);
  
      // user will be redirected to show page
      // verify
      assert.include(browser.getText('#video-detail-container'), video.title);
      assert.include(browser.getText('#video-detail-container'), video.description);
      assert.include(browser.getAttribute('#video-detail-container iframe', 'src'), video.videoUrl);
      
      // click the edit link
      browser.click('.edit-button');

      // set the new title value
      browser.setValue('input[id=title-input]', newTitle);
      browser.click('button[type=submit]');

      // user will be redirected to show page but we want the landing page to check all videos
      browser.url('/videos');
      // verify
      assert.notInclude(browser.getText('#videos-container'), video.title);
    });
  });

  
});

