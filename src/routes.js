import React, { Component } from 'react';
import App from './views/app/app';
import About from './views/about/about';
import PageNotFound from './views/page-not-found/page-not-found';
import FilteredSearchResult from './components/filtered-search-result/filtered-search-result.js';
import paths from './constants/paths';
import {Router, Route, browserHistory} from 'react-router';

class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path={paths.base} component={App}>
          <IndexRoute component={FilteredSearchResult} />
          <Route path={paths.about} component={About} />
        </Route>
		<Route path="*" component={PageNotFound} />
      </Router>
    );
  }
}

export default Routes;
