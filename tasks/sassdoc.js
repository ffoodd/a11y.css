var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sassdoc = require('sassdoc');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sassdoc(options.sassdoc));
};
