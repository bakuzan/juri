const enumArrayToObject = (arr) =>
  arr
    .slice(0)
    .reduce(
      (p, c) =>
        typeof c === 'object' ? { ...p, [c.name]: c.id } : { ...p, [c]: c },
      {}
    );

const mapArrToGraphqlString = (arr) => arr.join(' ');

const castStringToBool = (val) =>
  val === 'true' ? true : val === 'false' ? false : !!val;

function generateUniqueId() {
  return Math.abs(Date.now() / Math.random() + Math.random());
}

function joinTextContent(nodes) {
  const strs = [];
  for (let i = 0, length = nodes.length; i < length; i++) {
    strs.push(nodes[i].textContent);
  }
  return strs.join(', ');
}

module.exports = {
  enumArrayToObject,
  mapArrToGraphqlString,
  castStringToBool,
  generateUniqueId,
  joinTextContent
};
