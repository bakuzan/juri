function tryParseJSON(jsonString) {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {}
  return false;
}

module.exports = function handleBadJsonTextResponse(text) {
  const result = [];
  const objects = text.split('\n'); //.split(/({.+?})|(\[[^\[].+?\])(?=,|\])/); // Use this, not finished yet tho ({.+?})|(\[.+?\])(?=,|\])

  for (let i = 0, length = objects.length; i < length; i++) {
    const obj = objects[i];
    if (!obj) {
      continue;
    }

    const json = tryParseJSON(obj);
    if (json) {
      result.push(json);
    }
  }

  return result;
};
