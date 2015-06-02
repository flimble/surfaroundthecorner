'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  runSequence(['browserify','styles', 'images', 'fonts', 'views'],'startServer', ['browserSync','watch'], cb);

});