const fetch = require('node-fetch');
const jsdom = require('jsdom').jsdom;
const constants = require('./constants');

const fetchContentFromUrl = (url, dataType) => {
  return fetch(url).then((response) => {
    return response[dataType]();
  }).catch((err) => {
    return err;
  });
}

const processHtmlDocument = (html, selector, url) => {
  const document = jsdom(html);
  const window = document.defaultView;
  const items = window.document.querySelectorAll(selector);
  const temp = { data: items, url: url };
  console.log(temp.data[0].outerHTML);
  return temp;
}

const standardSearch = (res, type, search) => {
  const url = constants.url.favourite[type].replace(':searchString', search);
  fetchContentFromUrl(url, 'json').then((body) => {
    res.jsonp(body);
  });
}

const adultSearch = (res, type, search) => {
  const site = constants.url.adult[type][0];
  const url = site.url.replace(':searchString', search);
  fetchContentFromUrl(url, 'text').then((body) => {
    res.jsonp(processHtmlDocument(body, site.selector, url));
  });
}

const search = (req, res) => {
	const type = req.params.type;
  const age = req.params.age;
	const search = req.query.search;

	if (age === constants.age.standard) standardSearch(res, type, search);
  if (age === constants.age.adult) adultSearch(res, type, search);
}

module.exports = search;
