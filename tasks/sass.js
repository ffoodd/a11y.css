var gulp = require('gulp');
var sass = require('gulp-sass');
var options = require('./helpers/options');

module.exports = function () {
  return gulp.src(options.source)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(options.destination));
};
