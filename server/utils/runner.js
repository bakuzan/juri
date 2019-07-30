module.exports = function myRunner(obj) {
  return Function('"use strict";return (' + obj + ')')();
};
