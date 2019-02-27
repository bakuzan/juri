const fetch = require('node-fetch');
const responseProcessor = require('./responseProcessor');

function generateTrueUrl(url, { searchString, page = 1 }) {
  return url
    .replace(':searchString', searchString)
    .replace(':page', page)
    .replace(':timestamp', Date.now());
}

async function fetchContentFromSource(source, replacements) {
  const url = generateTrueUrl(source.url, replacements);

  try {
    const fetchData = await fetch(url, { method: 'GET' });
    const response = await fetchData[source.dataType]();
    return responseProcessor(source, response);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchContentFromSource
};
