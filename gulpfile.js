const { parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();

const svgSprites = require('./tasks/svg-sprites');
const clean = require('./tasks/clean');
const resources = require('./tasks/resources');
const deploy = require('./tasks/deploy');
const { fonts, fontsStyle } = require('./tasks/fonts');
const { imgToApp, minifyImage } = require('./tasks/images');
const { styles, stylesBuild } = require('./tasks/styles');
const { htmlInclude, htmlMinify } = require('./tasks/html');
const { scripts, scriptsBuild } = require('./tasks/scripts');
const { cache, rewrite } = require('./tasks/revision');

// DEV
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './app',
    },
  });

  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/html/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/resources/**', resources);
  watch('./src/img/**.jpg', imgToApp);
  watch('./src/img/**.jpeg', imgToApp);
  watch('./src/img/**.png', imgToApp);
  watch('./src/img/svg/**.svg', svgSprites);
  watch('./src/fonts/**', fonts);
  watch('./src/fonts/**', fontsStyle);
};

exports.fileinclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;

exports.default = series(
  clean,
  parallel(htmlInclude, scripts, fonts, resources, imgToApp, svgSprites),
  fontsStyle,
  styles,
  watchFiles
);

// BUILD
// exports.cache = series(cache, rewrite);

exports.build = series(
  clean,
  parallel(htmlInclude, scriptsBuild, fonts, resources, imgToApp, svgSprites),
  fontsStyle,
  stylesBuild,
  htmlMinify,
  minifyImage,
  cache,
  rewrite
);

// deploy
exports.deploy = deploy;
