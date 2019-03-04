import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import './Tickbox.scss';

const Tickbox = ({
  className,
  id,
  name,
  checked,
  disabled,
  onChange,
  text
}) => (
  <div className={classNames('input-container', className)}>
    <label
      className={classNames('tickbox', { 'tickbox--disabled': disabled })}
      htmlFor={id}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {text || ''}
    </label>
  </div>
);

Tickbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string
};

export default Tickbox;
