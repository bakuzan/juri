import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

import Icons from 'constants/icons';

import './RadioToggle.scss';

const defaultIcons = [Icons.cross2, Icons.tick];
function RadioToggle({ className, icons = defaultIcons, ...props }) {
  const ref = useRef();
  const [focused, setFocus] = useState(false);

  return (
    <div
      className={classNames(
        'radio-toggle',
        {
          'radio-toggle--checked': props.checked,
          'radio-toggle--focused': focused
        },
        className
      )}
      onClick={(event) => {
        const checkbox = ref.current;
        const { target } = event;

        if (target !== checkbox) {
          event.preventDefault();
          checkbox.focus();
          checkbox.click();
        }
      }}
    >
      <div className="radio-toggle__options">
        <div className="radio-toggle__option radio-toggle__checked">
          {icons[0]}
        </div>
        <div className="radio-toggle__option radio-toggle__unchecked">
          {icons[1]}
        </div>
      </div>
      <div className="radio-toggle__control" />
      <input
        {...props}
        ref={ref}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          const { checked, name } = e.target;
          props.onChange(checked, name);
        }}
        className="radio-toggle__for-screenreader"
        type="checkbox"
        aria-label="Switch between Dark and Light mode"
      />
    </div>
  );
}

RadioToggle.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired
};

export default RadioToggle;
