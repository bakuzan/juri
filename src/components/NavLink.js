import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

function isExternalUrl(url) {
  return !!url.match(/^https?/);
}

function JriLink({ className, to, children, ...props }) {
  const classes = classNames('nav-link', className);
  const isExternal = isExternalUrl(to);

  if (isExternal) {
    return (
      <a {...props} href={to} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <NavLink {...props} to={to} className={classes}>
      {children}
    </NavLink>
  );
}

JriLink.displayName = 'JriLink';
JriLink.propTypes = {
  to: PropTypes.string.isRequired
};

export default JriLink;
