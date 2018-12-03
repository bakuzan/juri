const jsdom = require('jsdom').jsdom;
const ContentItem = require('./content-item');
const FormData = require('form-data');

const generateForm = (site, search) => {
  const form = new FormData();
  for (let key in site.formData) {
    if (site.formData.hasOwnProperty(key)) {
      const value =
        site.formData[key] === ':searchString' ? search : site.formData[key];
      form.append(key, value);
    }
  }
  return form;
};

const processHtml = (html, site, url) => {
  let jsonItems = [];
  const selector = site.selector;
  const document = jsdom(html);
  const window = document.defaultView;
  const htmlItems = window.document.querySelectorAll(selector);

  for (let i = 0, length = htmlItems.length; i < length; i++) {
    const container = htmlItems[i];
    jsonItems.push(new ContentItem(url, container, site.name));
  }
  return jsonItems;
};

const tryParseJSON = (jsonString) => {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {}
  return false;
};

const handleBadJsonTextResponse = (text) => {
  let result = [];
  const objects = text.split(/({.+?})|(\[[^\[].+?\])(?=,|\])/); // Use this, not finished yet tho ({.+?})|(\[.+?\])(?=,|\])
  for (let i = 0, length = objects.length; i < length; i++) {
    const obj = objects[i];
    const json = tryParseJSON(obj);
    if (json) result.push(json);
  }
  return result;
};

const processResponse = (response, site, url) => {
  let array = response.data || response;
  if (/animeholics|mangapark/i.test(url)) {
    array = handleBadJsonTextResponse(array);
  }

  if (array instanceof Array) {
    console.log(`${array.length} items in array from ${site.name}`);
    return array.map((dataitem) => {
      return new ContentItem(url, dataitem, site.name);
    });
  } else {
    console.log(`HTML response from ${site.name}`);
    return processHtml(array, site, url);
  }
};

const processing = {
  response: processResponse,
  form: generateForm
};

module.exports = processing;
