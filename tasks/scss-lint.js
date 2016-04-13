var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');
var plumber = require('gulp-plumber');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  return gulp.src(options.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(scsslint(options.scsslint));
};
