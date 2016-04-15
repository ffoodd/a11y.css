var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var options = require('./helpers/options');

module.exports = function () {
  return gulp.src(options.hologramsource + '/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(gulp.dest(options.hologramsource + '/static/'));
};
