var gutil = require('gulp-util');

module.exports = function customReporter (file) {
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
  });
};
