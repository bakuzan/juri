import mal from './mal-search';

export const routes = (app) => {

	// MAL Routes
	app.route('/mal-search/:type').get(mal.search);
}
