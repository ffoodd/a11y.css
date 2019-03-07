var gulp   = require('gulp');
var rename = require('gulp-rename');

module.exports = function() {
  return gulp.src('./manifest-firefox.json')
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest('./webextension'));
}
