const { src, dest } = require('gulp');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revdel = require('gulp-rev-delete-original');

const cache = () =>
  src('app/**/*.{css,js,svg,png,jpg,jpeg,woff2}', {
    base: 'app',
  })
    .pipe(rev())
    .pipe(revdel())
    .pipe(dest('app'))
    .pipe(rev.manifest('rev.json'))
    .pipe(dest('app'));

const rewrite = () => {
  const manifest = src('app/rev.json');

  return src('app/**/*.html')
    .pipe(
      revRewrite({
        manifest,
      })
    )
    .pipe(dest('app'));
};

module.exports = {
  cache,
  rewrite,
};
