'use strict';

var config         = require('../config');
var gulp           = require('gulp');
var templateCache  = require('gulp-angular-templatecache');

// Views task
gulp.task('views', function() {
  return gulp.src(config.clientViews.src)
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest(config.clientViews.dest));

});