'use strict';

// Requires
var gulp       = require('gulp'),
    sassdoc    = require('sassdoc'),
    sass       = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    csso       = require('gulp-csso'),
    csslint    = require('gulp-csslint'),
    hologram   = require('gulp-hologram');

// Paths
var source      = './sass',
    destination = './css';


// Sass w sourcemaps
gulp.task('sass', function () {
  return sass(source + '/**/*.scss', {sourcemap: true, style: 'compressed'})
    .on('error', sass.logError)
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: source
    }))
    .pipe(gulp.dest(destination));
});

// Minify CSS
gulp.task('minify', function () {
  return gulp.src(destination + '/*.css')
    .pipe(csso());
});

// Generate SassDoc
gulp.task('sassdoc', function () {
  var options = {
    dest: 'docs',
    theme: 'default',
    display: {
      access: ['public'],
      alias: false,
      watermark: true,
    },
    groups: {
      "undefined": "Configuration",
      "languages": "Translation"
    },
    basePath: 'https://github.com/ffoodd/a11y.css/tree/master/sass',
  };

  return gulp.src(source + '/**/*.scss')
    .pipe(sassdoc(options));
});

// Generate Hologram
gulp.task('hologram', function() {
  gulp.src('./hologram_config.yml')
    .pipe(hologram());
});

// CSSLint
gulp.task('css-lint', function() {
  gulp.src(destination + '/**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});


// Build a11y.css
gulp.task('build', ['sass', 'minify']);

// Generate doc
gulp.task('docs', ['sassdoc', 'hologram']);

// Default: build
gulp.task('default', ['build']);

// Watch: build
gulp.task('watch', function () {
  gulp.watch(source + '/**/*.scss', ['build']);
});
