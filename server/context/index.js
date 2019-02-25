const responseProcessor = require('./responseProcessor');

function generateTrueUrl(url, { search, page }) {
  return url
    .replace(':searchString', search)
    .replace(':page', page)
    .replace(':timestamp', Date.now());
}

async function fetchContentFromSource(source, replacements) {
  const url = generateTrueUrl(source.url, replacements);

  try {
    const fetchData = await fetch(url, { method: 'GET' });
    const response = fetchData[source.dataType]();
    return responseProcessor(source, response);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchContentFromSource
};
