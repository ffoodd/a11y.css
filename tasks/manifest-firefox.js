var gulp = require('gulp');
var zip  = require('gulp-zip');
var plumber = require('gulp-plumber');
var rename  = require('gulp-rename');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function() {
  return gulp.src('./manifest-firefox.json')
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest('./webextension'));
}
