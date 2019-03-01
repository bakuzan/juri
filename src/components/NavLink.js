import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ className, ...props }) => (
  <NavLink {...props} className={classNames('nav-link', className)} />
);
