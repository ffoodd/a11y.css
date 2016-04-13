var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var options = require('./helpers/options');

var base = './docs/Hologram/test-assets';

module.exports = function () {
  return gulp.src(base + '/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(gulp.dest(base + '/static/'));
};
