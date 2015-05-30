'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');

gulp.task('css', function () {
  return gulp.src(config.clientCSS.src)
    .pipe(gulp.dest(config.clientCSS.dest));
});