import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import PageNotFound from 'views/PageNotFound';
import ManageList from './ManageList';
import ManageForm from './ManageForm';

import './Manage.scss';

function Manage({ match, ...props }) {
  const sourceState = useState(new Map());
  const informationState = useState(null);

  return (
    <Switch>
      <Route
        exact
        path={match.path}
        render={(props) => <ManageList {...props} sourceState={sourceState} />}
      />
      <Route
        path={`${match.path}/create`}
        render={(props) => (
          <ManageForm {...props} informationState={informationState} />
        )}
      />
      <Route
        path={`${match.path}/:id`}
        render={(props) => (
          <ManageForm {...props} informationState={informationState} />
        )}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}

export default Manage;
