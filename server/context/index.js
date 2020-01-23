const fetch = require('node-fetch');
const FormData = require('form-data');

const { generateUniqueId, joinTextContent } = require('../utils');
const myRunner = require('../utils/runner');
const processNestedJson = require('../utils/processedNestedJson');
const handleBadJsonTextResponse = require('../utils/handleBadJsonTextResponse');
const processHtml = require('../utils/processHtml');

async function fetchContentFromSource(source, replacements) {
  const optionsFn = myRunner(source.optionsParser);
  const responseFn = myRunner(source.responseParser);
  const itemFn = myRunner(source.itemParser);

  const opts = optionsFn(replacements, { FormData, JSON });

  try {
    const reqOpts = opts.options || {};
    const response = await fetch(opts.url, { method: 'GET', ...reqOpts });

    const data = await responseFn(response, {
      processNestedJson,
      handleBadJsonTextResponse,
      processHtml
    });

    return Array.from(data).map((x) =>
      itemFn(x, {
        generateUniqueId,
        joinTextContent,
        proxyUrl: 'https://proxy.duckduckgo.com/iu/?u='
      })
    );
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchContentFromSource
};
