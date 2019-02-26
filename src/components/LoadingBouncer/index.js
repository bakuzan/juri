import classNames from 'classnames';
import React from 'react';

import './LoadingBouncer.scss';

const LoadingBouncer = () => (
  <div className={classNames('loading-bouncer', 'meiko-bouncer')}>
    <div />
    <div />
    <div />
  </div>
);

export default LoadingBouncer;
