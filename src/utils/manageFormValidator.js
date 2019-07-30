export default function manageFormValidator(values) {
  const errors = new Map();

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

  return { success: errors.size === 0, errors };
}
