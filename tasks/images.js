const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');
const tiny = require('gulp-tinypng-compress');

const imgToApp = () =>
  src([
    './src/img/**.jpg',
    './src/img/**.png',
    './src/img/**.jpeg',
    './src/img/*.svg',
  ]).pipe(dest('./app/img'));

const minifyImage = () =>
  src('src/img/**.{gif,png,jpg,jpeg,svg}')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 85, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest('./app/img'));

const tinypng = () =>
  src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
    .pipe(
      tiny({
        key: 'HkdjDW01hVL5Db6HXSYlnHMk9HCvQfDT',
        sigFile: './app/img/.tinypng-sigs',
        parallel: true,
        parallelMax: 50,
        log: true,
      })
    )
    .pipe(dest('./app/img'));

module.exports = {
  minifyImage,
  imgToApp,
  tinypng,
};
