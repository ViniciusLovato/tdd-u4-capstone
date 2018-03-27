const {jsdom} = require('jsdom');
const Video = require('../models/video');


// Create and return a sample Item object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'Just a video title';
  const description = options.description || 'Just a video description';
  const videoUrl = options.videoUrl || 'https://www.youtube.com/embed/zw47_q9wbBE';
  return {title, description, videoUrl};
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

// Add a sample Item object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

const findIFrameElementBySource = (htmlAsString, src) => {
  const iframe = jsdom(htmlAsString).querySelector(`iframe[src="${src}"]`);
  if (iframe !== null) {
    return iframe;
  } else {
    throw new Error(`iframe with src "${src}" not found in HTML string`);
  }
};

// Add a video for feature test
const createVideoUsingForm = (video, browser) => {
    // Creates a new video
    browser.url('/videos/create');
    browser.setValue('input[id=title-input]', video.title);
    browser.setValue('textarea[id=description-input]', video.description);
    browser.setValue('textarea[id=videoUrl-input]', video.videoUrl);

    // submit the form
    browser.click('button[type=submit]');
}

module.exports = {
  parseTextFromHTML,
  seedVideoToDatabase,
  buildVideoObject,
  findIFrameElementBySource,
  createVideoUsingForm
};
