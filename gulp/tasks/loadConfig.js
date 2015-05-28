 'use strict';

 var gulp = require('gulp');
 var gutil  require('gulp-util');

 gulp.task('loadConfig', function() {
 	gutil.log('loading environment config');

 	var init = require('../../config/init')();
 	var config = require('../../config/config');

 });