const { JSDOM } = require('jsdom');

const { SourceDataTypes } = require('../constants/enums');
const { generateUniqueId, joinTextContent } = require('../utils');

function processHtml(source, html) {
  const { selector } = source;
  const { window } = new JSDOM(html);
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
  const objects = text.split('\n'); //.split(/({.+?})|(\[[^\[].+?\])(?=,|\])/); // Use this, not finished yet tho ({.+?})|(\[.+?\])(?=,|\])

  for (let i = 0, length = objects.length; i < length; i++) {
    const obj = objects[i];
    if (!obj) {
      continue;
    }

    const json = tryParseJSON(obj);
    if (json) {
      result.push(json);
    }
  }

  return result;
}

function processNestedJson(data, attrString) {
  const attrs = attrString.split('.');
  return attrs.reduce((p, c) => p[c], data);
}

function myRunner(obj) {
  return Function('"use strict";return (' + obj + ')')();
}

module.exports = function responseProcessor(source, response) {
  let data = response.data || response;
  const isNestedJson =
    source.dataType === SourceDataTypes.json && !!source.selector;
  const isBadResponse =
    source.dataType === SourceDataTypes.text && source.selector === 'BADJSON';

  if (isBadResponse) {
    data = handleBadJsonTextResponse(data);
  } else if (isNestedJson) {
    data = processNestedJson(data, source.selector);
  }

  const fn = myRunner(source.parser);
  const mapper = (d) => fn(d, { generateUniqueId, joinTextContent });

  if (source.dataType === SourceDataTypes.json || isBadResponse) {
    console.log(`${data.length} array items from ${source.name}`);
    return data.map(mapper);
  } else {
    const htmlItems = processHtml(source, data);
    console.log(`${htmlItems.length} HTML items from ${source.name}`);
    return Array.from(htmlItems).map(mapper);
  }
};
