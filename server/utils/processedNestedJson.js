module.exports = function processNestedJson(data, attrString) {
  const attrs = attrString.split('.');
  return attrs.reduce((p, c) => p[c], data) || [];
};
