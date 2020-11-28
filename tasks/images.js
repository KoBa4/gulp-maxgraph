const { src, dest } = require('gulp');
const tiny = require('gulp-tinypng-compress');

const imgToApp = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg', './src/img/*.svg'])
    .pipe(dest('./app/img'))
}

const tinypng = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
    .pipe(tiny({
      key: 'HkdjDW01hVL5Db6HXSYlnHMk9HCvQfDT',
      sigFile: './app/img/.tinypng-sigs',
      parallel: true,
      parallelMax: 50,
      log: true,
    }))
    .pipe(dest('./app/img'))
}

module.exports = {
  imgToApp,
  tinypng,
};
