const del = require('del');

module.exports = function clean() {
  return del(['app/*']);
};
