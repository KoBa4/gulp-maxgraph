const { src, dest } = require('gulp');
const webpackStream = require('webpack-stream');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const browserSync = require('browser-sync').create();

const scripts = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream(
      {
        mode: 'development',
        output: {
          filename: '[name].min.js',
        },
        devtool: 'source-map',
        optimization: {
          minimize: true,
        },
        module: {
          rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader'],
          }]
        },
      }
    ))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end'); // Don't stop the rest of the task
    })
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

const scriptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream({
      mode: 'production',
      output: {
        filename: '[name].min.js',
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserWebpackPlugin({
            parallel: true,
            terserOptions: {
              format: { comments: false },
            },
            extractComments: false,
          }),
        ],
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader'],
        }]
      },
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end'); // Don't stop the rest of the task
    })
    .pipe(dest('./app/js'))
}

module.exports = {
  scripts,
  scriptsBuild,
};
