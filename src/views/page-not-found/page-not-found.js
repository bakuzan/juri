import React from 'react';

const PageNotFound = ({ location = {} }) => {
  return (
    <p>
      Page not found - the path, <code>{location.pathname}</code>, did not match
      any React Router routes.
    </p>
  );
};

export default PageNotFound;
