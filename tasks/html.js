const { src, dest } = require('gulp');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

const htmlInclude = () => {
  return src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src('app/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('app'));
}

module.exports = {
  htmlInclude,
  htmlMinify,
};
