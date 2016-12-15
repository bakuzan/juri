const app = require('./app');
const malSearch = require('./mal-search');
const paths = require('../src/constants/paths');

export const routes = () => {
  // MAL Route
  app.route(paths.query.malSearch).get(mal.search);

  // Content Site Routes
}
