const jsdom = require('jsdom').jsdom;

const { SourceDataTypes } = require('../constants/enums');

function processHtml(source, html) {
  let jsonItems = [];
  const selector = site.selector;
  const document = jsdom(html);
  const window = document.defaultView;
  const htmlItems = window.document.querySelectorAll(selector);

  for (let i = 0, length = htmlItems.length; i < length; i++) {
    const container = htmlItems[i];
    jsonItems.push(mapResponseData(source, container));
  }
  return jsonItems;
}

function tryParseJSON(jsonString) {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {}
  return false;
}

function handleBadJsonTextResponse(text) {
  let result = [];
  const objects = text.split(/({.+?})|(\[[^\[].+?\])(?=,|\])/); // Use this, not finished yet tho ({.+?})|(\[.+?\])(?=,|\])

  for (let i = 0, length = objects.length; i < length; i++) {
    const obj = objects[i];
    const json = tryParseJSON(obj);
    if (json) {
      result.push(json);
    }
  }

  return result;
}

module.exports = function responseProcessor(source, response) {
  let data = response.data || response;
  if (/animeholics|mangapark/i.test(url)) {
    data = handleBadJsonTextResponse(data);
  }

  if (source.dataType === SourceDataTypes.json) {
    console.log(`${array.length} items in array from ${source.name}`);
    return data.map((d) => mapResponseData(source, d));
  } else {
    console.log(`HTML response from ${source.name}`);
    return processHtml(source, data);
  }
};
