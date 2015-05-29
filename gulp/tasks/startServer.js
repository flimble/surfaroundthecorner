'use strict';

var config = require('../config');
var globalConfig = require('./loadConfig');
var gulp = require('gulp');
var chalk = require('chalk');
var nodemon = require('gulp-nodemon');


function startServer() {
	var demon = nodemon({
		script: 'server.js',
		ext: 'js html',
		env: {
			'NODE_ENV': 'development'
		}
	});
	demon.on('crash', function(error) {
		console.log(chalk.red(error));
		demon.reset();	
		startServer();
	});
}

gulp.task('startServer', ['loadConfig'], function() {
	startServer();
});