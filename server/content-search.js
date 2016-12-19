const fetch = require('node-fetch');
const constants = require('./constants');

const standardSearch = (res, type, search) => {
  const url = constants.url.favourite[type].replace(':searchString', search);
  fetch(url).then((response) => {
    return response.json();
  }).then((body) => {
    res.jsonp(body);
  }).catch((err) => {
    return err;
  });
}

const search = (req, res) => {
	const type = req.params.type;
  const age = req.params.age;
	const search = req.query.search;

	if (age === constants.age.standard) standardSearch(res, type, search);
}

module.exports = search;
