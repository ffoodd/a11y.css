var gulp = require('gulp');
var options = require('./helpers/options');

module.exports = function() {
  return gulp.src(options.webextensionpolyfill)
    .pipe(gulp.dest('./webextension/scripts'));
}
