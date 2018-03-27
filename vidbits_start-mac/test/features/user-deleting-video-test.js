const {assert} = require('chai');

const {buildVideoObject, createVideoUsingForm} = require('../test-utils');


describe('delete video', () => {
  describe('user clicks to remove item', () => {
    it('should not render in the list', () => {

      // setup
      const video = buildVideoObject();

      // exercise
      createVideoUsingForm(video, browser);

      // After submit user should be redirected to show details page
      // delete the record
      browser.click('#delete-button');

      // verify
      assert.notInclude(browser.getText('#videos-container'), video.title);
      assert.notInclude(browser.getText('#videos-container'), video.description);
    });
  });

});
