'use strict';

var gulp = require('gulp');

// Single tasks
gulp.task('sass', require('./tasks/sass'));
gulp.task('css', ['sass'], require('./tasks/css'));
gulp.task('sassdoc', require('./tasks/sassdoc'));
gulp.task('hologram', require('./tasks/hologram'));
gulp.task('scss-lint', require('./tasks/scss-lint'));
gulp.task('css-lint', require('./tasks/css-lint'));
gulp.task('watch', require('./tasks/watch'));

// Meta tasks
gulp.task('docs', ['sassdoc', 'hologram']);
gulp.task('lints', ['scss-lint', 'css-lint']);
gulp.task('default', ['css']);
