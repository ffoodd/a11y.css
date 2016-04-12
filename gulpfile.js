'use strict';

// Requires
var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    sassdoc      = require('sassdoc'),
    alix         = require('sassdoc-theme-alix'),
    sass         = require('gulp-sass'),
    gutil        = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb      = require('gulp-csscomb'),
    csslint      = require('gulp-csslint'),
    scsslint     = require('gulp-scss-lint'),
    hologram     = require('gulp-hologram');

// Paths
var source      = './sass/**/*.scss',
    destination = './css';

// Autoprefixer config
var autoprefixerOptions = {
  browsers: ['last 2 versions']
};

// Error handler with plumber
var onError = function(err) {
  console.log(err);
  this.emit('end');
};

// Sass
gulp.task('sass', function () {
  return gulp.src(source)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destination));
});

// CSS
gulp.task('css', ['sass'], function () {
  return gulp.src(destination + '/**/*.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(csscomb())
    .pipe(gulp.dest(destination));
});


// Generate SassDoc
gulp.task('sassdoc', function () {
  var options = {
    dest: 'docs/SassDoc',
    theme: 'alix',
    display: {
      access: ['public'],
      alias: false,
      watermark: true
    },
    groups: {
      "undefined": "Configuration",
      "languages": "Translation"
    },
    basePath: 'https://github.com/ffoodd/a11y.css/tree/master/sass'
  };

  return gulp.src(source)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sassdoc(options));
});

// Generate Hologram
gulp.task('hologram', function() {
  gulp.src('./configs/hologram_config.yml')
    .pipe(plumber({errorHandler: onError}))
    .pipe(hologram());
});


// scss lint
gulp.task('scss-lint', function() {
  return gulp.src(source)
    .pipe(plumber({errorHandler: onError}))
    .pipe(scsslint({
      'config': 'configs/.scsslint.yml'
    }));
});

// CSSLint custom reporter
function customReporter(file) {
  gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

  file.csslint.results.forEach(function(result) {
    if (result.error.type === 'warning') {
      gutil.log( gutil.colors.yellow.bold('[Warning]') + gutil.colors.green(' Line: ' + result.error.line) + gutil.colors.cyan(' Column: ' + result.error.col) + ' ' + gutil.colors.magenta(result.error.message) + ' ' +  gutil.colors.gray(result.error.rule.desc) + ' ' + gutil.colors.red('Browsers: ' + result.error.rule.browsers));
    }
    else {
      gutil.log( gutil.colors.red.bold('[' + result.error.type + ']') + gutil.colors.green(' Line: ' + result.error.line) + gutil.colors.cyan(' Column: ' + result.error.col) + ' ' + gutil.colors.magenta(result.error.message) + ' ' +  gutil.colors.gray(result.error.rule.desc) + ' ' + gutil.colors.red('Browsers: ' + result.error.rule.browsers));
    }
  });
}

// CSSLint
gulp.task('css-lint', function() {
  gulp.src(destination + '/**/*.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(csslint())
    .pipe(csslint.reporter(customReporter));
});


// Generate doc
gulp.task('docs', ['sassdoc', 'hologram']);

// Linters
gulp.task('lints', ['scss-lint', 'css-lint']);

// Default: build
gulp.task('default', ['css']);

// Watch: build
gulp.task('watch', function () {
  gulp.watch(source, ['default'], 'lints');
});
