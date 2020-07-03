import React from 'react';
import PropTypes from 'prop-types';

function EditorError({ errors, formatErrors, fieldName }) {
  const hasError = errors.has(fieldName) || formatErrors.has(fieldName);

  if (!hasError) {
    return null;
  }

  return (
    <div className="form-control__error parser-tab__error">
      {errors.get(fieldName) ?? formatErrors.get(fieldName)}
    </div>
  );
}

EditorError.propTypes = {
  fieldName: PropTypes.string.isRequired,
  errors: PropTypes.instanceOf(Map).isRequired,
  formatErrors: PropTypes.instanceOf(Map).isRequired
};

export default EditorError;
