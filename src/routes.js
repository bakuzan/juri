import React, { Component } from 'react';
import App from './views/app/app';
import About from './views/about/about';
import Latest from './views/latest/latest';
import PageNotFound from './views/page-not-found/page-not-found';
import FilteredSearchResult from './components/filtered-search-result/filtered-search-result.js';
import { paths } from './constants/paths';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';

class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Redirect from="/" to={paths.base} />

        <Route path={paths.base} component={App}>
          <IndexRoute component={FilteredSearchResult} />

          <Route path={paths.about} component={About} />
          <Route path={paths.latest} component={Latest} />
        </Route>

        <Route path="*" component={PageNotFound} />
      </Router>
    );
  }
}

export default Routes;
