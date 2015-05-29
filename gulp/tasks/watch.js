'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('watch', ['browserSync'], function() {

	// Scripts are automatically watched and rebundled by Watchify inside Browserify task
	gulp.watch(config.clientJS.src, ['lint']);
	gulp.watch(config.serverJS.src, ['lint']);
	gulp.watch(config.clientLESS.src, ['styles']);
	gulp.watch(config.images.src, ['images']);
	gulp.watch(config.fonts.src, ['fonts']);
	gulp.watch(config.clientViews.watch, ['views']);	

});