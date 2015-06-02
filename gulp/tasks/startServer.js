'use strict';

var config = require('../config');
var globalConfig = require('./loadConfig');
var gulp = require('gulp');
var chalk = require('chalk');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');


function startServer() {
	var called = false;

	var demon = nodemon({
		script: 'server.js',
		ext: 'js html',
		nodeArgs: ['--debug'],
		env: {
			'NODE_ENV': 'development'
		},
		watch: config.serverJS.src
	});
	demon.on('restart', function() {
		// Also reload the browsers after a slight delay
		setTimeout(function reload() {
			browserSync.reload({
				stream: false
			});
		}, 500);
	});
}

gulp.task('startServer', ['loadConfig'], function() {
	startServer();
});