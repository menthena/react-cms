'use strict';

var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', ['browserSync'], function() {
  // console.log('logging');
  // Scripts are automatically watched by Watchify inside Browserify task
  gulp.watch(config.styles.src,                 ['browserify']);
  gulp.watch(config.images.src,                 ['imagemin']);
  gulp.watch(config.sourceDir + 'index.html',   ['copyIndex']);
  gulp.watch(config.sourceDir + 'js/**/*-test.js', ['jest']);
});
