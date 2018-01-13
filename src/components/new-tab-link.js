import React from 'react';

const NewTabLink = ({ children, ...props }) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default NewTabLink;
