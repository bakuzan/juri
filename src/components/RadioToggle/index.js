import classNames from 'classnames';
import React, { useRef, useState } from 'react';

import './RadioToggle.scss';

const defaultIcons = ['\u274C', '\u2713'];
function RadioToggle({ className, icons = defaultIcons, ...props }) {
  const ref = useRef();
  const [focused, setFocus] = useState(false);

  return (
    <div
      className={classNames('radio-toggle', {
        'radio-toggle--checked': props.checked,
        'radio-toggle--focused': focused
      })}
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

export default RadioToggle;
