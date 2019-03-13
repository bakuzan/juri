import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import './Tickbox.scss';

const Tickbox = ({ className, text, ...props }) => (
  <div className={classNames('tickbox-container', className)}>
    <label
      className={classNames('tickbox', { 'tickbox--disabled': props.disabled })}
      htmlFor={props.id}
    >
      <input type="checkbox" {...props} />
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
