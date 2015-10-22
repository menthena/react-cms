'use strict';

var gulp = require('gulp');
var jscs = require('gulp-jscs');

gulp.task('jscs', function() {
  return gulp.src('app/js/**/*.js')
      .pipe(jscs({ esprima: 'esprima-fb' }))
      .pipe(jscs.reporter());
});
