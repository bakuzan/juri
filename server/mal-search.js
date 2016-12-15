const popura = require('popura');
const client = popura(process.env.MAL_USER, process.env.MAL_PASSWORD);

const animeSearch = (search) => {
		client.searchAnimes(search).then((result) => {
			res.jsonp(result);
		}).catch((err) => {
			return err;
		});
}

const mangaSearch = (search) => {
		client.searchMangas(search).then((result) => {
			res.jsonp(result);
		}).catch((err) => {
			return err;
		});
}

export default search = (req, res) => {
	console.log('server => mal search : ', req);
	const type = req.params.type;
	const search = req.query.searchString;

	if (type === 'anime') return animeSearch(search);
	if (type === 'manga') return mangaSearch(search);
}
