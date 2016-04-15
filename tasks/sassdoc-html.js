var gulp = require('gulp');
var plumber = require('gulp-plumber');
var htmlmin = require('gulp-html-minifier');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.sassdochtmlsource)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }))
    .pipe(gulp.dest(options.sassdochtmldest));
};
