import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

function TabView({ className, isActive, children, ...props }) {
  const isFunctionChildren = typeof children === 'function';

  return (
    <div
      className={classNames(
        'tab-view',
        { 'tab-view--active': isActive },
        className
      )}
      role="tabpanel"
      {...props}
    >
      {isFunctionChildren ? children(isActive) : children}
    </div>
  );
}

TabView.defaultProps = {
  isActive: false
};

TabView.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func
  ]).isRequired
};

export default TabView;
