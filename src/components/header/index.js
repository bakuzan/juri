import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import './Header.scss';

function Header({
  id,
  className,
  title,
  navLeft,
  navRight,
  leftAlignTitle,
  ...props
}) {
  return (
    <nav
      id={id}
      className={classNames('application-header', className)}
      {...props}
    >
      {!!navLeft && <div className={classNames('links-block')}>{navLeft}</div>}
      {!leftAlignTitle && <div className="flex-spacer" />}
      {!!title && <h1>{title}</h1>}
      <div className="flex-spacer" />
      {!!navRight && (
        <div className={classNames('links-block')}>{navRight}</div>
      )}
    </nav>
  );
}

Header.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  leftAlignTitle: PropTypes.bool,
  navLeft: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  navRight: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Header;
