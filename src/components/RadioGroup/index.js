import React from 'react';

import RadioButton from 'meiko/RadioButton';

import './RadioGroup.scss';

function RadioGroup({ name, options, title, value, onChange }) {
  return (
    <div className="radio-group">
      <div>{title}</div>
      <div className="radio-group__options">
        {options.map((x) => (
          <RadioButton
            key={x.id}
            {...x}
            name={name}
            checked={x.value === value}
            onChange={() => onChange({ [name]: x.value })}
          />
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
