const jsdom = require('jsdom').jsdom;

const { SourceDataTypes } = require('../constants/enums');
const { generateUniqueId, joinTextContent } = require('../utils');

function processHtml(source, html) {
  const { selector } = source;
  const document = jsdom(html);
  const window = document.defaultView;
  return window.document.querySelectorAll(selector);
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
  const result = [];
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

function myRunner(obj) {
  return Function('"use strict";return (' + obj + ')')();
}

module.exports = function responseProcessor(source, response) {
  let data = response.data || response;
  if (/animeholics|mangapark/i.test(source.url)) {
    data = handleBadJsonTextResponse(data);
  }

  const fn = myRunner(source.parser);
  const mapper = (d) => fn(d, { generateUniqueId, joinTextContent });
  console.log('Response Data: ', data);
  if (source.dataType === SourceDataTypes.json) {
    console.log(`${data.length} array items from ${source.name}`);
    return data.map(mapper);
  } else {
    const htmlItems = processHtml(source, data);
    console.log(`${htmlItems.length} HTML items from ${source.name}`);
    return Array.from(htmlItems).map(mapper);
  }
};
