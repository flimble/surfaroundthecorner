'use strict';

var config = require('../config');
var globalConfig = require('./loadConfig');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('startServer', ['loadConfig'], function() {
	nodemon({
		script: 'server.js',
		ext: 'js html',
		env: {
			'NODE_ENV': 'development'
		}
	});
});