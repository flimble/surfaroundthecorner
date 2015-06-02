'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');


function mochaTest() {
	return gulp.src(['./server/**/*.js'])
		.pipe(istanbul())
		.pipe(istanbul.hookRequire())
		.on('finish', function() {
			var server = require('./../../server');

			gulp.src(['test/server/*.js'])
				.pipe(mocha())
				.pipe(istanbul.writeReports()) // Creating the reports after tests runned
				.pipe(istanbul.enforceThresholds({
					thresholds: {
						global: 10
					}
				}))
				.once('end', function() {
					process.exit();
				});
		});
}

gulp.task('testServer', ['env:test', 'loadConfig'], function(cb) {

	mochaTest();
	// Nonsensical source to fall back to files listed in karma.conf.js,
	// see https://github.com/lazd/gulp-karma/issues/9
});