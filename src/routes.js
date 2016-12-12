import React, { Component } from 'react';
import App from './views/app/app';
import About from './views/about/about';
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
      </Router>
    );
  }
}

export default Routes;
