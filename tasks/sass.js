var gulp = require('gulp');
var sass = require('gulp-sassport');
var options = require('./helpers/options');

module.exports = function () {
  return gulp.src(options.source)
    .pipe(sass([], { outputStyle: 'compressed' }))
    .pipe(gulp.dest(options.destination));
};
