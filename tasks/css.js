var gulp = require('gulp');
var plumber = require('gulp-plumber');
var csscomb = require('gulp-csscomb');
var autoprefixer = require('gulp-autoprefixer');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.destination + '/**/*.css')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(csscomb())
    .pipe(gulp.dest(options.destination));
};
