var gulp = require('gulp');
var plumber = require('gulp-plumber');
var hologram = require('gulp-hologram');
var onError = require('./helpers/onError');

module.exports = function () {
  gulp.src('./configs/hologram_config.yml')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(hologram());
};
