const jsdom = require('jsdom').jsdom;
const ContentItem = require('./content-item');

const processHtml = (html, selector, url) => {
  let jsonItems = [];
  const document = jsdom(html);
  const window = document.defaultView;
  const htmlItems = window.document.querySelectorAll(selector);
  console.log(`processHtml ${selector} : `, htmlItems.length);
  for(let i = 0, length = htmlItems.length; i < length; i++) {
    const container = htmlItems[i];
    jsonItems.push(new ContentItem(url, container));
  }
  return jsonItems;
};

module.exports = processHtml;
