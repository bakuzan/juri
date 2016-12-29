const fetch = require('node-fetch');
const constants = require('../constants');
const processHtml = require('../processors/process-html');
const ContentItem = require('../processors/content-item');

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

const setQueryOptions = (site, search) => {
  let options = { method: 'GET' };
  if (site.options) {
    site.options.body = site.options.body.replace(':searchString', search);
    options = site.options;
  }
  return options;
}

const fetchContentFromUrl = (site, search) => {
  const url = site.url.replace(':searchString', search);
  let fetchOptions = setQueryOptions(site, search);

  return fetch(url, fetchOptions).then((fetchData) => {
    return fetchData[site.dataType]();
  }).then((response) => {
    return processResponse(response, site, url);
  }).catch((err) => {
    return err;
  });
}

const standardSearch = (res, type, search, index) => {
  const site = constants.url.standard[type][index];
  fetchContentFromUrl(site, search).then((jsonResult) => {
    res.jsonp(jsonResult);
  });
}

const adultSearch = (res, type, search, index) => {
  const site = constants.url.adult[type][index];
  fetchContentFromUrl(site, search).then((jsonResult) => {
    res.jsonp(jsonResult);
  });
}

const search = (req, res) => {
	const type = req.params.type;
  const age = req.params.age;
  const siteIndex = req.params.site;
	const search = req.query.search;

	if (age === constants.age.standard) standardSearch(res, type, search, siteIndex);
  if (age === constants.age.adult) adultSearch(res, type, search, siteIndex);
}

const siteList = (req, res) => {
  res.jsonp(constants.url);
}

const contentSearch = {
  search: search,
  siteList: siteList
}

module.exports = contentSearch;
