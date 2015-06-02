'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var config = require('../config');

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

gulp.task('testProtractor', ['webdriver-update', 'webdriver'], function() {

	var server = require('./../../server');
	server.listen(9001);

	return gulp.src('test/e2e/**/*.js')
		.pipe(protractor({
			configFile: config.test.protractor,
		}))
		.once('end', function() {
			process.exit();
		})
		.on('error', function(err) {
			// Make sure failed tests cause gulp to exit non-zero
			throw err;
		});

});