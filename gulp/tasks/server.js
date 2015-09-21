'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

gulp.task('nodemon', function() {
  nodemon({
    script: 'server/app.js'
  })
  .on('restart', function() {
    browserSync.reload();
  });
});
