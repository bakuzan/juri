const responseProcessor = require('./responseProcessor');

function generateTrueUrl(url, { search, page }) {
  return source.url.replace(':searchString', search).replace(':page', page);
}

function fetchContentFromSource(source, replacements) {
  const url = generateTrueUrl(source.url, replacements);

  return fetch(url, { method: 'GET' })
    .then((fetchData) => {
      return fetchData[source.dataType]();
    })
    .then((response) => {
      return responseProcessor(source, response);
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  fetchContentFromSource
};
