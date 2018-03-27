const {assert} = require('chai');
const {buildVideoObject, createVideoUsingForm} = require('../test-utils');



describe('User visits landing page', () => {
  describe('with no videos', () => {
    it('should not display any video', () => {
      browser.url('/videos');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('and navigates to', () =>{
    it('/videos/create page', () => {
      // setup
      browser.url('/videos');

      // exercise
      browser.click('a[href="/videos/create"]');

      // verify
      assert.include(browser.getText('body'), 'Save a video');
    })
  })

  describe('and navigates to an existing video', () => {
    it('can navigate', () => {
      // setup
      const video = buildVideoObject();

      createVideoUsingForm(video, browser);

      // open index because when creating a video user is redirected to the details page
      browser.url('/videos');

      browser.click('.video-card a');

      // verify
      assert.include(browser.getText('body'), video.title);
      assert.include(browser.getText('body'), video.description);
      assert.include(browser.getAttribute('body iframe', 'src'), video.videoUrl);

    });
  });

  describe('users adds a new video', () => {
    it('should display the new video in the landing page', () => {

      // setup
      const video = buildVideoObject();

     createVideoUsingForm(video, browser);

      // open index because when creating a video user is redirected to the details page
      browser.url('/videos');
      
      // verify
      assert.include(browser.getText('#videos-container'), video.title);
      assert.include(browser.getText('#videos-container'), video.description);
      assert.include(browser.getAttribute('.video-videoUrl', 'src'), video.videoUrl);

    });
  });
});