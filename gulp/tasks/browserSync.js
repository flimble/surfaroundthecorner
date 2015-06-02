'use strict';

var config      = require('../config');
var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', function() {
  browserSync({
  	//tells browsersync where express app is running
    proxy: 'localhost:3000',

    //open the proxied app in chrome
    browser: 'google-chrome',
    
    //what files to monitor
    files: ['client/build/**/*.{js,css}','client/views/**/*.html'],

    port: 4000
  });
});