const fetch = require('node-fetch');
const constants = require('./constants');
const processHtml = require('./process-html');

const fetchContentFromUrl = (url, dataType) => {
  return fetch(url).then((response) => {
    return response[dataType]();
  }).catch((err) => {
    return err;
  });
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

module.exports = search;
