const { src, dest } = require('gulp');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');

let srcFonts = './src/scss/_fonts.scss';
let appFonts = './app/fonts/';
const cb = () => {};

const fonts = () =>
  src('./src/fonts/**.ttf').pipe(ttf2woff2()).pipe(dest('./app/fonts/'));

const checkWeight = fontName => {
  let weight;
  switch (true) {
    case fontName.endsWith('Thin'):
      weight = 100;
      break;
    case /(ExtraLight|UltraLight)$/g.test(fontName):
      weight = 200;
      break;
    case fontName.endsWith('Light'):
      weight = 300;
      break;
    case /(Normal|Regular)$/g.test(fontName):
      weight = 400;
      break;
    case fontName.endsWith('Medium'):
      weight = 500;
      break;
    case /(Semi|SemiBold|DemiBold)$/g.test(fontName):
      weight = 600;
      break;
    case fontName.endsWith('Bold'):
      weight = 700;
      break;
    case /(ExtraBold|UltraBold)$/g.test(fontName):
      weight = 800;
      break;
    case /(Black|Heavy)$/g.test(fontName):
      weight = 900;
      break;
    default:
      weight = 400;
  }
  return weight;
};

const fontsStyle = done => {
  // eslint-disable-next-line no-unused-vars
  let fileContent = fs.readFileSync(srcFonts);

  fs.writeFile(srcFonts, '', undefined, cb);
  fs.readdir(appFonts, function (err, items) {
    if (items) {
      let cFontName = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const item of items) {
        let fontname = item.split('.');
        fontname = fontname[0];
        let font = fontname.split('-')[0];
        let weight = checkWeight(fontname);

        if (cFontName !== fontname) {
          fs.appendFile(
            srcFonts,
            `@include font-face("${font}", "${fontname}", ${weight});\r\n`,
            undefined,
            cb
          );
        }
        cFontName = fontname;
      }
    }
  });

  done();
};

module.exports = {
  fonts,
  fontsStyle,
};
