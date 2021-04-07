const fs = require('fs');
const path = require('path');

function isType(type, val) {
  return val.constructor.name.toLowerCase() === type.toLowerCase();
}

function isJsonData(data) {
  if (isType('array', data) || isType('object', data)) {
    return true;
  }

  return false;
}

function prepareHtml(data) {
  if (!isType('nodelist', data)) {
    return data;
  }

  return Array.from(data)
    .map((x) => x.outerHTML)
    .join('');
}

async function writeOut(rawSiteName, rawData) {
  const siteName = rawSiteName.replace(/ /g, '_').toLowerCase();
  const isDebugging = Number(process.env.DEBUGGING);

  if (!isDebugging) {
    return;
  }

  const isJSON = isJsonData(rawData);
  const data = isJSON ? JSON.stringify(rawData, null, 2) : prepareHtml(rawData);

  const ext = isJSON ? 'json' : 'html';
  const filename = `output_${siteName}.${ext}`;
  const filepath = path.resolve(path.join(__dirname, '..', filename));

  if (!fs.existsSync(filepath)) {
    fs.closeSync(fs.openSync(filepath, 'w'));
  }

  fs.writeFile(filepath, data, function(err) {
    if (err) {
      return console.error(err);
    }

    console.log(`Saved ${filename}.`);
  });
}

module.exports = {
  writeOut
};
