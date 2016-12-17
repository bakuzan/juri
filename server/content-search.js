const fetch = require('node-fetch');
const constants = require('./constants');

const animeStandardSearch = (res, search) => {
  const url = constants.url.anime.masterani.replace(':searchString', search);
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

	if (type === constants.type.anime && age === constants.age.standard) animeStandardSearch(res, search);
}

module.exports = search;
