import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './views/app/app';
import About from './views/about/about';
import Latest from './views/latest/latest';
import PageNotFound from './views/page-not-found/page-not-found';
import FilteredSearchResult from './components/filtered-search-result/filtered-search-result.js';
import { paths } from './constants/paths';

class Routes extends Component {
  render() {
    return (
      <Router history={createHistory()}>
        <App>
          <Switch>
            <Redirect from="/" to={paths.base} />
            <Route path={paths.base} component={FilteredSearchResult} />
            <Route path={paths.about} component={About} />
            <Route path={paths.latest} component={Latest} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </App>
      </Router>
    );
  }
}

export default Routes;
