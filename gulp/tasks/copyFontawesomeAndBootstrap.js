'use strict';

var gulp   = require('gulp');
var config = require('../config');

gulp.task('copyFontawesomeAndBootstrap', function() {

  return gulp.src([config.sourceDir + 'styles/fontawesome.css', config.sourceDir + 'styles/bootstrap.css'])
    .pipe(gulp.dest(config.buildDir + 'css/'));

});
