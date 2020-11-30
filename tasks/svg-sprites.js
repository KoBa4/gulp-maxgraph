const { src, dest } = require('gulp');
const svgSprite = require('gulp-svg-sprite');

module.exports = function svgSprites() {
  return src('./src/img/svg/**.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg', // sprite file name
          },
        },
      })
    )
    .pipe(dest('./app/img'));
};
