const { JSDOM } = require('jsdom');

module.exports = function processHtml(selector, html) {
  const { window } = new JSDOM(html);
  return window.document.querySelectorAll(selector);
};
