var fs = require('fs');
var gulp    = require('gulp');
var rootbeer = require('rootbeer');
var source  = require('vinyl-source-stream');
var rename  = require('gulp-rename');
var plumber = require('gulp-plumber');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  options.locales.forEach( function(locale) {
    return fs.createReadStream('locales/' + locale + '.json')
      .pipe(plumber({ errorHandler: onError }))
      .pipe(rootbeer({ prefix: '$messages: ' }))
      .pipe(source(locale + '.json'))
      .pipe(rename('_' + locale + '.scss'))
      .pipe(gulp.dest(options.localesdest));
  });
};
