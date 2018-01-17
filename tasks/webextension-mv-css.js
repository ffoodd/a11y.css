var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename  = require('gulp-rename');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.webextensionmvcsssource)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(rename({suffix: '_all'}))
    .pipe(gulp.dest(options.webextensioncssdest));
};
