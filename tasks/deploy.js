const { src } = require('gulp');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');

module.exports = function deploy() {
  let conn = ftp.create({
    host: '',
    user: '',
    password: '',
    parallel: 10,
    log: gutil.log,
  });

  let globs = ['app/**'];

  return src(globs, {
    base: './app',
    buffer: false,
  })
    .pipe(conn.newer('')) // only upload newer files
    .pipe(conn.dest(''));
};
