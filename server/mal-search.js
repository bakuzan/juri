const popura = require('popura');
const client = popura(process.env.MAL_USER, process.env.MAL_PASSWORD);

const animeSearch = (search) => {
		client.searchAnimes(search).then((result) => {
			console.log(search, result);
			res.jsonp(result);
		}).catch((err) => {
			return err;
		});
}

const mangaSearch = (search) => {
		client.searchMangas(search).then((result) => {
			console.log(search, result);
			res.jsonp(result);
		}).catch((err) => {
			return err;
		});
}

const search = (req, res) => {
	const type = req.params.type;
	const search = req.query.search;
	console.log(req.url, type, search);
	if (type === 'anime') animeSearch(search);
	if (type === 'manga') mangaSearch(search);
}

module.exports = search;
