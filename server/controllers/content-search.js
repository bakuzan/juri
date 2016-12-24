const fetch = require('node-fetch');
const constants = require('../constants');
const processHtml = require('../processors/process-html');
const ContentItem = require('../processors/content-item');

const fetchContentFromUrl = (url, dataType, options) => {
  let fetchOptions = { method: 'GET' };
  if (options) fetchOptions = options;

  return fetch(url, fetchOptions).then((response) => {
    return response[dataType]();
  }).catch((err) => {
    return err;
  });
}

const standardSearch = (res, type, search) => {
  const site = constants.url.standard[type][1];
  const url = site.url.replace(':searchString', search);

  if (site.options) {
    site.options = site.postData(search);
  }

  fetchContentFromUrl(url, 'json', site.options).then((body) => {
    let array = body.data || body;
    return array.map((dataItem) => {
      return new ContentItem(url, dataItem);
    });
  }).then((jsonResult) => {
    res.jsonp(jsonResult);
  });
}

const adultSearch = (res, type, search) => {
  const site = constants.url.adult[type][0];
  const url = site.url.replace(':searchString', search);
  fetchContentFromUrl(url, 'text').then((body) => {
    return processHtml(body, site.selector, url);
  }).then((jsonResult) => {
    res.jsonp(jsonResult);
  });
}

const search = (req, res) => {
	const type = req.params.type;
  const age = req.params.age;
	const search = req.query.search;

	if (age === constants.age.standard) standardSearch(res, type, search);
  if (age === constants.age.adult) adultSearch(res, type, search);
}

const siteList = (req, res) => {
  res.jsonp(constants.url);
}

const contentSearch = {
  search: search,
  siteList: siteList
}

module.exports = contentSearch;
