 'use strict';

 var gulp = require('gulp');
 var chalk = require('chalk');

 gulp.task('loadConfig', function() {
 	console.log(chalk.yellow('loading environment config'));

 	var init = require('../../config/init')();
 	var config = require('../../config/config');

 });