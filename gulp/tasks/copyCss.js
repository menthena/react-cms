'use strict';

var gulp   = require('gulp');
var config = require('../config');

gulp.task('copyCss', function() {

  return gulp.src(config.sourceDir + 'styles/**/*.css')
    .pipe(gulp.dest(config.buildDir + 'css/'));

});
