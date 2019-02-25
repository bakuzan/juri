import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import App from 'components/App';
import Latest from 'views/Latest';
import PageNotFound from 'views/PageNotFound';
import Search from 'views/Search';
import Paths from 'constants/paths';

const history = createHistory();

function JuriRoutes({ match }) {
  return (
    <Switch>
      <Route exact path={match.path} component={Search} />
      <Route path={`${match.path}${Paths.latest}`} component={Latest} />
    </Switch>
  );
}

function Routes() {
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

export default Routes;
