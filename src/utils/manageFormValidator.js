import DataTypes from 'constants/dataTypes';
import SourceTypes from 'constants/sourceTypes';

export default function manageFormValidator(values) {
  const errors = new Map();

  if (!values.name || !values.name.trim()) {
    errors.set('name', 'Name is required.');
  }

  if (!values.url || !values.url.trim()) {
    errors.set('url', 'Url is required.');
  }

  // Data Type
  if (!values.dataType) {
    errors.set('dataType', 'Data Type is required.');
  }

  if (values.dataType === DataTypes.text && !values.selector) {
    errors.set('selector', 'Selector is required for Data Type "text".');
  }

  // Source Type
  if (!values.sourceType) {
    errors.set('sourceType', 'Source Type is required.');
  }

  if (
    values.sourceType === SourceTypes.search &&
    values.url &&
    values.url.includes(':page')
  ) {
    errors.set(
      'url',
      'Source Type "Search" does not currently support the ":page" replacement.'
    );
  }

  // Media Type
  if (!values.mediaType) {
    errors.set('mediaType', 'Media Type is required.');
  }

  // Parser
  if (!values.parser || !values.parser.trim()) {
    errors.set('parser', 'Parser is required.');
  }

  return { success: errors.size === 0, errors };
}
