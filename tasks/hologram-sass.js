var gulp = require('gulp');
var sass = require('gulp-sass');
var base = './docs/Hologram/test-assets';

module.exports = function () {
  return gulp.src(base + '/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(base + '/static/'));
};
