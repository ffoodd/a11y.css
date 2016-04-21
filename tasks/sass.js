var gulp = require('gulp');
var sass = require('gulp-sassport');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass([], { outputStyle: 'compressed', infer: false }))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(gulp.dest(options.destination));
};
