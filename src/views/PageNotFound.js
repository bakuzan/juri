import React from 'react';
import { Helmet } from 'react-helmet-async';

function PageNotFound({ location = {} }) {
  return (
    <div>
      <Helmet title="Page Not Found" />
      <p>
        Page not found - the path, <pre>{location.pathname}</pre>, did not match
        any React Router routes.
      </p>
    </div>
  );
}

export default PageNotFound;
