var gulp = require('gulp');
var plumber = require('gulp-plumber');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.webextensioncsssource)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(options.webextensioncssdest));
};
