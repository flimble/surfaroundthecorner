'use strict';

var gulp = require('gulp');
var nodeInspector = require('gulp-node-inspector');

gulp.task('debug', function() {
  gulp.src([])
    .pipe(nodeInspector({
      debugPort: 5858,
      webHost: 'localhost',
      webPort: 1337,
      saveLiveEdit: false,
      preload: true,
      inject: true,
      hidden: [],
      stackTraceLimit: 50
    }));
});