import React from 'react';
import Loadable from 'react-loadable';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';
import LoadingBouncer from 'components/LoadingBouncer';
import Paths from 'constants/paths';

const loadableSettings = { loading: LoadingBouncer, delay: 300 };
const Search = Loadable({
  loader: () => import(/* webpackChunkName: 'search' */ './views/Search'),
  ...loadableSettings
});
const Latest = Loadable({
  loader: () => import(/* webpackChunkName: 'latest' */ './views/Latest'),
  ...loadableSettings
});
const Manage = Loadable({
  loader: () => import(/* webpackChunkName: 'manage' */ './views/Manage'),
  ...loadableSettings
});
const PageNotFound = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'notFound' */ './views/PageNotFound'),
  ...loadableSettings
});

const history = createHistory();

function JuriRoutes({ match }) {
  return (
    <Switch>
      <Route exact path={match.path} component={Search} />
      <Route path={`${match.path}${Paths.latest}`} component={Latest} />
      <Route path={`${match.path}${Paths.manage}`} component={Manage} />
      <Route path="*" component={PageNotFound} />
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
