const jsdom = require('jsdom').jsdom;
const ContentItem = require('./content-item');

const processHtml = (html, selector, url) => {
  let jsonItems = [];
  const document = jsdom(html);
  const window = document.defaultView;
  const htmlItems = window.document.querySelectorAll(selector);

  for(let i = 0, length = htmlItems.length; i < length; i++) {
    const container = htmlItems[i];
    jsonItems.push(new ContentItem(url, container));
  }
  return { data: jsonItems };
};

module.exports = processHtml;
