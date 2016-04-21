var gulp = require('gulp');
var path = require('path');
var csslint = require('gulp-csslint');
var plumber = require('gulp-plumber');
var options = require('./helpers/options');
var onError = require('./helpers/onError');

module.exports = function () {
  gulp.src(options.destination + '/**/*.css')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(csslint(path.resolve(__dirname, '..', 'configs', '.csslintrc')))
    .pipe(csslint.reporter(customReporter));
};

function customReporter (file) {
  gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

  file.csslint.results.forEach(function (result) {
    var message = gutil.colors.green(' Line: ' + result.error.line) +
      gutil.colors.cyan(' Column: ' + result.error.col) + ' ' +
      gutil.colors.magenta(result.error.message) + ' ' +
      gutil.colors.gray(result.error.rule.desc) + ' ' +
      gutil.colors.red('Browsers: ' + result.error.rule.browsers);

    if (result.error.type === 'warning') {
      message = gutil.colors.yellow.bold('[Warning]') + message;
    } else {
      message = gutil.colors.red.bold('[' + result.error.type + ']') + message;
    }

    gutil.log(message);
  })
}
