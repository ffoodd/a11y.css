var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.hologramsource + '/js/**/*.js')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('docs.js'))
    .pipe(uglify())
    .pipe(gulp.dest(options.hologramsource + '/static/js/'));
};
