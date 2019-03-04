import classNames from 'classnames';
import React from 'react';

import './LoadingBouncer.scss';

const LoadingBouncer = ({ className }) => (
  <div className={classNames('loading-bouncer', className)}>
    <div className="loading-bouncer__orb" />
    <div className="loading-bouncer__orb" />
    <div className="loading-bouncer__orb" />
  </div>
);

export default LoadingBouncer;
