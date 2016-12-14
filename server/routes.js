import app from './app';
import mal from './mal-search';
import { paths } from '../src/constants/paths';

export const routes = () => {
  // MAL Route
  app.route(paths.query.malSearch).get(mal.search);

  // Content Site Routes
}
