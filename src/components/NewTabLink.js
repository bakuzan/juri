import React from 'react';

import NavLink from './NavLink';

const NewTabLink = ({ children, ...props }) => (
  <NavLink {...props} target="_blank" rel="noopener noreferrer">
    {children}
  </NavLink>
);

NewTabLink.displayName = 'NewTabLink';

export default NewTabLink;
