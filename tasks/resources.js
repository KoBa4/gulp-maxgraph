const { src, dest } = require('gulp');

module.exports = function resources() {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}
