import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';

import { capitalise } from 'utils';

import './ToggleBox.scss';

function ToggleBox({ className, label, text, handleChange, ...props }) {
  const [focused, setFocus] = useState(false);

  return (
    <div
      className={classNames('toggle-box', 'ripple', {
        'toggle-box--focused': focused
      })}
    >
      <label className="toggle-box__text">
        <input
          type="checkbox"
          {...props}
          className="toggle-box__for-screenreader"
          aria-label={label}
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
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
