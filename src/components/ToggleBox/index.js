import PropTypes from 'prop-types';
import React from 'react';

import { capitalise } from 'utils';

import './ToggleBox.scss';

function ToggleBox({ label, text, handleChange, ...props }) {
  return (
    <div className="toggle-box ripple">
      <label
        className="toggle-box__text"
        role="checkbox"
        tabIndex={0}
        aria-checked={props.checked}
        aria-label={label}
      >
        <input
          type="checkbox"
          {...props}
          onChange={(e) => {
            const name = e.target.name;
            const value = e.target.checked;
            handleChange(name, value);
          }}
        />
        {capitalise(text[props.checked])}
      </label>
    </div>
  );
}

ToggleBox.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.shape({
    true: PropTypes.string.isRequired,
    false: PropTypes.string.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ToggleBox;
