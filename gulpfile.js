'use strict';

var gulp = require('gulp');

// Single tasks
gulp.task('sass', require('./tasks/sass'));
gulp.task('css', ['sass'], require('./tasks/css'));
gulp.task('sassdoc', require('./tasks/sassdoc'));
gulp.task('sassdoc-html', require('./tasks/sassdoc-html'));
gulp.task('hologram-js', require('./tasks/hologram-js'));
gulp.task('hologram-sass', require('./tasks/hologram-sass'));
gulp.task('hologram', ['hologram-sass', 'hologram-js'], require('./tasks/hologram'));
gulp.task('hologram-html', require('./tasks/hologram-html'));
gulp.task('scss-lint', require('./tasks/scss-lint'));
gulp.task('css-lint', require('./tasks/css-lint'));
gulp.task('watch', require('./tasks/watch'));

// Meta tasks
gulp.task('docs', ['sassdoc', 'hologram']);
gulp.task('html', ['sassdoc-html', 'hologram-html']);
gulp.task('lints', ['scss-lint', 'css-lint']);
gulp.task('default', ['css']);
