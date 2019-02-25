import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './Button.scss';

function getButtonClasses({
  className,
  btnStyle,
  btnSize,
  link,
  rounded,
  depress,
  icon
}) {
  const hasBtnStyle = !!btnStyle;
  const hasBtnSize = !!btnSize;
  const hasLink = !!link;
  const hasIcon = !!icon;
  return classNames(className, {
    button: !hasLink && !hasIcon,
    'button-link': hasLink,
    'button-icon': hasIcon,
    [btnStyle]: hasBtnStyle,
    [btnSize]: hasBtnSize,
    rounded,
    depress
  });
}

export const Button = ({
  className,
  btnStyle,
  btnSize,
  link,
  rounded,
  depress,
  children,
  ...props
}) => {
  const buttonClasses = getButtonClasses({
    className,
    btnStyle,
    btnSize,
    link,
    rounded,
    depress,
    icon: props.icon
  });

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  type: PropTypes.string,
  btnStyle: PropTypes.oneOf(['primary', 'accent']),
  btnSize: PropTypes.oneOf(['small']),
  rounded: PropTypes.bool,
  depress: PropTypes.bool,
  link: PropTypes.bool,
  onClick: PropTypes.func
};

export function withButtonisation(WrappedComponent) {
  return ({
    className,
    btnStyle,
    btnSize,
    link,
    rounded,
    depress,
    icon,
    ...passProps
  }) => {
    const buttonClasses = getButtonClasses({
      className,
      btnStyle,
      btnSize,
      link,
      rounded,
      depress,
      icon
    });

    return (
      <WrappedComponent {...passProps} icon={icon} className={buttonClasses} />
    );
  };
}
