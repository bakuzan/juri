import classNames from 'classnames';
import React from 'react';

import { ClearableInput as CI, SelectBox as SB } from 'meikoLib';

import './FormControls.scss';

function withErrorMessage(Component) {
  function FormControl({ className, errors, value, ...props }) {
    return (
      <div className={classNames('form-control', className)}>
        <Component {...props} value={value || ''} />
        {errors.has(props.name) && (
          <div className="form-control__error">{errors.get(props.name)}</div>
        )}
      </div>
    );
  }

  return FormControl;
}

export const ClearableInput = withErrorMessage(CI);
export const SelectBox = withErrorMessage(SB);
