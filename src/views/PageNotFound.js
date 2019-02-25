import React from 'react';

function PageNotFound({ location = {} }) {
  return (
    <p>
      Page not found - the path, <pre>{location.pathname}</pre>, did not match
      any React Router routes.
    </p>
  );
}

export default PageNotFound;
