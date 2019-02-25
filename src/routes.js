import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import App from 'components/App';
import Latest from './views/Latest';
import PageNotFound from './views/PageNotFound';
import Search from './views/Search';
import Paths from './constants/paths';

const history = createHistory();

const JuriRoutes = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={Search} />
    <Route path={`${match.path}${Paths.latest}`} component={Latest} />
  </Switch>
);

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <App>
          <Switch>
            <Redirect exact from="/" to={Paths.base} />
            <Route path={Paths.base} component={JuriRoutes} />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </App>
      </Router>
    );
  }
}

export default Routes;
