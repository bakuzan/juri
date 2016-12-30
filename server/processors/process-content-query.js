const jsdom = require('jsdom').jsdom;
const ContentItem = require('./content-item');
const FormData = require('form-data');

const generateForm = (site, search) => {
  const form = new FormData();
  for(let key in site.formData) {
    if (site.formData.hasOwnProperty(key)) {
      const value = site.formData[key] === ':searchString' ? search : site.formData[key];
      form.append(key, value);
    }
  }
  return form;
}

const processHtml = (html, selector, url) => {
  let jsonItems = [];
  const document = jsdom(html);
  const window = document.defaultView;
  const htmlItems = window.document.querySelectorAll(selector);
  console.log(`processHtml ${selector} : `, html);
  for(let i = 0, length = htmlItems.length; i < length; i++) {
    const container = htmlItems[i];
    jsonItems.push(new ContentItem(url, container));
  }
  return jsonItems;
}

const processResponse = (response, site, url) => {
  let array = response.data || response;
  console.log(response, url);
  if (array instanceof Array) {
    return array.map((dataitem) => {
      return new ContentItem(url, dataitem);
    });
  } else {
    return processHtml(array, site.selector, url);
  }
}

const processing = {
  response: processResponse,
  form: generateForm
}

module.exports = processing;
