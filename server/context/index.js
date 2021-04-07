const FormData = require('form-data');

const Reddit = require('./reddit');
const { filterFalsey, generateUniqueId, joinTextContent } = require('../utils');
const myRunner = require('../utils/runner');
const processNestedJson = require('../utils/processedNestedJson');
const handleBadJsonTextResponse = require('../utils/handleBadJsonTextResponse');
const processHtml = require('../utils/processHtml');
const juriFetch = require('../utils/juriFetch');
const debugging = require('../utils/debugging');

const helpers = {
  generateUniqueId,
  joinTextContent,
  proxyUrl: 'https://proxy.duckduckgo.com/iu/?u='
};

async function fetchContentFromSource(source, replacements) {
  const optionsFn = myRunner(source.optionsParser);
  const responseFn = myRunner(source.responseParser);
  const itemFn = myRunner(source.itemParser);

  const opts = optionsFn(replacements, { FormData, JSON });

  try {
    const reqOpts = opts.options || {};
    const response = await juriFetch(opts, { method: 'GET', ...reqOpts });

    const data = await responseFn(response, {
      sourceName: source.name,
      debugging,
      processNestedJson,
      handleBadJsonTextResponse,
      processHtml
    });

    await debugging.writeOut(source.name, data);

    return Array.from(data)
      .map((entry, index, allData) => itemFn(entry, helpers, index, allData))
      .filter(filterFalsey);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchContentFromSource,
  Reddit
};
