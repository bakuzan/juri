import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './SelectBox.scss';

const SelectBox = ({
  className,
  id,
  name,
  value,
  disabled,
  onSelect,
  text,
  options
}) => (
  <div className={classNames('has-float-label', 'select-container', className)}>
    <select
      className={classNames('select-box')}
      id={id}
      name={name}
      value={value}
      onChange={onSelect}
      disabled={disabled}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
    <label htmlFor={id}>{text}</label>
  </div>
);

SelectBox.defaultProps = {
  disabled: false
};

SelectBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SelectBox;
