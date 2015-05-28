'use strict';

var config = require('../config');
var globalConfig = require('./loadConfig');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('server', ['loadConfig'], function() {  
  nodemon({
      script: 'server.js',
      ext: 'js',
      env: {
        'NODE_ENV': 'development'
      }
    })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function() {
      console.log('restarted!');
    });
});