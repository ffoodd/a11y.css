var gulp = require('gulp');
var zip  = require('gulp-zip');
var plumber = require('gulp-plumber');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.webextension)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(zip('a11ycss-webextension.zip'))
    .pipe(gulp.dest('./'));
};
