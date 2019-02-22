import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './views/app/app';
import Latest from './views/latest/latest';
import PageNotFound from './views/page-not-found/page-not-found';
import FilteredSearchResult from './components/filtered-search-result/filtered-search-result.js';
import { paths } from './constants/paths';

const history = createHistory();

const JuriRoutes = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={FilteredSearchResult} />
    <Route path={`${match.path}${paths.latest}`} component={Latest} />
  </Switch>
);

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <App>
          <Switch>
            <Redirect exact from="/" to={paths.base} />
            <Route path={paths.base} component={JuriRoutes} />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </App>
      </Router>
    );
  }
}

export default Routes;
