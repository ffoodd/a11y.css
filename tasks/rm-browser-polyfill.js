var gulp = require('gulp');
var del  = require('del');

module.exports = function() {
  return del('./webextension/scripts/browser-polyfill.min.js');
}
