'use strict';

// Requires
var gulp         = require('gulp'),
    sassdoc      = require('sassdoc'),
    sass         = require('gulp-ruby-sass'),
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


// Sass
gulp.task('sass', function () {
  return sass(source)
    .on('error', sass.logError)
    .pipe(gulp.dest(destination));
});

// CSS
gulp.task('css', ['sass'], function () {
  return gulp.src(destination + '/**/*.css')
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(csscomb())
    .pipe(gulp.dest(destination));
});


// Generate SassDoc
gulp.task('sassdoc', function () {
  var options = {
    dest: 'docs/SassDoc',
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

  return gulp.src(source)
    .pipe(sassdoc(options));
});

// Generate Hologram
gulp.task('hologram', function() {
  gulp.src('./configs/hologram_config.yml')
    .pipe(hologram());
});


// scss lint
gulp.task('scss-lint', function() {
  return gulp.src(source)
    .pipe(scsslint({
      'config': 'configs/.scsslint.yml'
    }));
});

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
    .pipe(csslint())
    .pipe(csslint.reporter(customReporter));
});


// Build a11y.css
//gulp.task('build', ['sass']);

// Generate doc
gulp.task('docs', ['sassdoc', 'hologram']);

// Linters
gulp.task('lints', ['scss-lint', 'css-lint']);

// Default: build
gulp.task('default', ['css']);

// Watch: build
gulp.task('watch', function () {
  gulp.watch(source, ['default']);
});
