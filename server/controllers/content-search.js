const fetch = require('node-fetch');
const constants = require('../constants');
const processor = require('../processors/process-content-query');
const malChecking = require('./mal-checking');

const setQueryOptions = (site, search) => {
  let options = { method: 'GET' };
  if (site.options) {
    site.options.body = processor.form(site, search);
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
    return processor.response(response, site, url);
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

const latest = (req, res) => {
  const type = req.params.type;
  const site = constants.url.latest[type][0];
  fetchContentFromUrl(site, '').then((jsonResult) => {
    malChecking.setMyAnimeListFlag(type, jsonResult)
    res.jsonp(jsonResult);
  });
}

const siteList = (req, res) => {
  res.jsonp(constants.url);
}

const contentSearch = {
  search: search,
  latest: latest,
  siteList: siteList
}

module.exports = contentSearch;
