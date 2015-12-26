'use strict';

// Requires
var gulp         = require('gulp'),
    sassdoc      = require('sassdoc'),
    sass         = require('gulp-ruby-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    gutil        = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    csslint      = require('gulp-csslint'),
    scsslint     = require('gulp-scss-lint'),
    hologram     = require('gulp-hologram');

// Paths
var source      = './sass',
    destination = './css';

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


// Sass w sourcemaps
gulp.task('sass', function () {
  return sass(source + '/**/*.scss', {sourcemap: true, style: 'compressed'})
    .on('error', sass.logError)
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: source
    }))
    .pipe(gulp.dest(destination));
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


// scss lint
gulp.task('scss-lint', function() {
  return gulp.src(source + '/**/*.scss')
    .pipe(scsslint({
      'config': '.scsslint.yml',
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

// Default: build
gulp.task('default', ['sass']);

// Watch: build
gulp.task('watch', function () {
  gulp.watch(source + '/**/*.scss', ['build']);
});
