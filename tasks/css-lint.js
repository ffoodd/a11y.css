var gulp = require('gulp');
var csslint = require('gulp-csslint');
var plumber = require('gulp-plumber');
var options = require('./helpers/options');
var onError = require('./helpers/onError');
var reporter = require('./helpers/reporter');

module.exports = function () {
  gulp.src(options.destination + '/**/*.css')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(csslint())
    .pipe(csslint.reporter(reporter));
};
