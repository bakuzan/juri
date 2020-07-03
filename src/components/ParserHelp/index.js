import PropTypes from 'prop-types';
import React from 'react';

import './ParserHelp.scss';

function ParserHelp({ attr, data }) {
  if (!data) {
    return null;
  }

  const opts = data.find((x) => x.key === attr);
  if (!opts) {
    return null;
  }

  const { functionSignature, returnObject, availableHelperFunctions } = opts;
  const helpers = (
    availableHelperFunctions.join('\r\n') || '\r\nNone available'
  ).trim();

  return (
    <div className="parser-help">
      <pre className="parser-help__text">
        <strong>Expected function with signature:</strong>
        {`\r\n${functionSignature.trim()}`}
      </pre>
      <br />
      <pre className="parser-help__text">
        <strong>Available Helpers:</strong>
        {`\r\n${helpers}`}
      </pre>
      <br />
      <pre className="parser-help__text">
        <strong>Return object model:</strong>
        {`\r\n${returnObject.trim()}`}
      </pre>
    </div>
  );
}

ParserHelp.propTypes = {
  attr: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      functionSignature: PropTypes.string.isRequired,
      returnObject: PropTypes.string.isRequired,
      availableHelperFunctions: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  )
};

export default ParserHelp;
