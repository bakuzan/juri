const { JSDOM } = require('jsdom');

module.exports = function processHtml(source, html) {
  const { selector } = source;
  const { window } = new JSDOM(html);
  return window.document.querySelectorAll(selector);
};
