const popura = require('popura');
const client = popura(process.env.MAL_USER, process.env.MAL_PASSWORD);

const animeSearch = (res, search) => {
		client.searchAnimes(search).then((result) => {
			res.jsonp(result);
		}).catch((err) => {
			return err;
		});
}

const mangaSearch = (res, search) => {
		client.searchMangas(search).then((result) => {
			res.jsonp(result);
		}).catch((err) => {
			return err;
		});
}

const search = (req, res) => {
	const type = req.params.type;
	const search = req.query.search;

	if (type === 'anime') animeSearch(res, search);
	if (type === 'manga') mangaSearch(res, search);
}

module.exports = search;
