'use strict';

var config = require('../config');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var _ = require('lodash');

gulp.task('lint', function() {
	var exclusions = ['!client/js/templates.js'];
	var jsFiles = _.union(config.clientJS.src, config.serverJS.src, exclusions);

	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});