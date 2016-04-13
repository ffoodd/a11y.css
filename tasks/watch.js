var gulp = require('gulp');
var options = require('./helpers/options');

module.exports = function () {
  gulp.watch(options.source, ['default'], 'lints');
};
