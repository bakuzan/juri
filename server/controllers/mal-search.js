const constants = require('../constants');
const popura = require('popura');
const client = popura(process.env.MAL_USER, process.env.MAL_PASSWORD);

const helperFunctions = {
	removeNullOnEmpty: (result) => {
		if (result[0] === null) return [];
		return result;
	}
}

const animeSearch = (res, search) => {
		client.searchAnimes(search).then((result) => {
			res.jsonp(helperFunctions.removeNullOnEmpty(result));
		}).catch((err) => {
			return err;
		});
}

const mangaSearch = (res, search) => {
		client.searchMangas(search).then((result) => {
			res.jsonp(helperFunctions.removeNullOnEmpty(result));
		}).catch((err) => {
			return err;
		});
}

const search = (req, res) => {
	const type = req.params.type;
	const search = req.query.search;

	if (type === constants.type.anime) animeSearch(res, search);
	if (type === constants.type.manga) mangaSearch(res, search);
}

module.exports = search;
