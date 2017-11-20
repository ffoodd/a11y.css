var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var csslint = require('gulp-csslint');
var plumber = require('gulp-plumber');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

csslint.addFormatter('csslint-stylish');

module.exports = function () {
  gulp.src(options.destination + '/**/*.css')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(csslint(path.resolve(__dirname, '..', 'configs', 'csslintrc.json')))
    .pipe(csslint.formatter('stylish'));
};
