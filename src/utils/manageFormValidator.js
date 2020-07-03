import formatCode from './formatCode';

function formatAndUpdate(key, values, errors) {
  const response = formatCode(values[key]);

  if (response.isPretty) {
    values[key] = response.value;
  } else {
    errors.set(key, response.errorMessage);
  }
}

export default function manageFormValidator(data, includeFormatting = false) {
  const values = { ...data };
  const errors = new Map();
  const formatErrors = new Map();

  if (!values.name || !values.name.trim()) {
    errors.set('name', 'Name is required.');
  }

  // Source Type
  if (!values.sourceType) {
    errors.set('sourceType', 'Source Type is required.');
  }

  // Media Type
  if (!values.mediaType) {
    errors.set('mediaType', 'Media Type is required.');
  }

  // Parsers
  if (!values.optionsParser || !values.optionsParser.trim()) {
    errors.set('optionsParser', 'Options Parser is required.');
  }

  if (!values.responseParser || !values.responseParser.trim()) {
    errors.set('responseParser', 'Response Parser is required.');
  }

  if (!values.itemParser || !values.itemParser.trim()) {
    errors.set('itemParser', 'Item Parser is required.');
  }

  if (includeFormatting) {
    formatAndUpdate('optionsParser', values, formatErrors);
    formatAndUpdate('responseParser', values, formatErrors);
    formatAndUpdate('itemParser', values, formatErrors);
  }

  return {
    success: errors.size === 0 && formatErrors.size === 0,
    errors,
    formatErrors,
    values
  };
}
