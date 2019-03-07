'use strict';

var gulp = require('gulp');

// Single tasks
gulp.task('sass', require('./tasks/sass'));
gulp.task('sassdoc', require('./tasks/sassdoc'));
gulp.task('hologram-js', require('./tasks/hologram-js'));
gulp.task('hologram-sass', require('./tasks/hologram-sass'));
gulp.task('hologram', gulp.series('hologram-sass', 'hologram-js', gulp.parallel( require('./tasks/hologram') )));
gulp.task('scss-lint', require('./tasks/scss-lint'));
gulp.task('css-lint', require('./tasks/css-lint'));
gulp.task('watch', require('./tasks/watch'));
gulp.task('copy-css', require('./tasks/webextension-cp-css'));
gulp.task('move-css', require('./tasks/webextension-mv-css'));
gulp.task('translate', require('./tasks/translate'));

// Webextension
gulp.task('webextension:css', gulp.series('copy-css', 'move-css'));
gulp.task('webextension:firefox', gulp.series(
  require('./tasks/manifest-firefox'),
  require('./tasks/webextension-firefox')
));
gulp.task('webextension:chrome', gulp.series(
  require('./tasks/mv-browser-polyfill'),
  require('./tasks/manifest-chrome'),
  require('./tasks/webextension-chrome'),
  require('./tasks/rm-browser-polyfill'),
));
gulp.task('webextension', gulp.series('webextension:css', gulp.series('webextension:firefox', 'webextension:chrome')));

// Meta tasks
gulp.task('docs', gulp.parallel('sassdoc', 'hologram'));
gulp.task('lints', gulp.series('scss-lint', 'css-lint'));
gulp.task('default', gulp.series('sass'));
