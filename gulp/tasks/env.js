'use strict';

var gulp = require('gulp');

gulp.task('env:test', function() {
	process.env.NODE_ENV = 'test';
});