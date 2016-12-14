import mal from './mal-search';
import paths from '../src/constants/paths';

export const routes = (app) => {
  // MAL Routes
  app.route(paths.query.malSearch).get(mal.search);
}
