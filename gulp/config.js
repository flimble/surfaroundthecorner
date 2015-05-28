'use strict';

module.exports = {
  'serverport': 3000,

  'styles': {
    'src': 'client/styles/*.less',
    'dest': 'client/build/css',
    'sourcemap': true
  },
  'clientScripts': {
    'src': ['client/js/*.js', 'client/js/**/*.js']
  },
  'images': {
    'src': 'client/images/**/*',
    'dest': 'client/build/images'
  },
  'fonts': {
    'src': ['client/fonts/**/*','client/vendor/bootstrap/fonts/*', 'client/vendor/font-awesome/fonts/*'],
    'dest': 'client/build/fonts'
  },
  'clientViews': {
    'watch': [
      'client/views/**/*.html'
    ],
    'src': 'client/views/**/*.html',
    'dest': 'client/js'
  },
  'serverViews': {
    'watch': [
      'server/views/**/*.html'
    ],
    'src': 'server/views/**/*.html',
    'dest': 'client/js'
  },
  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'build/',
    'options': {}
  },
  'dist': {
    'root': 'build'
  },
  'browserify': {
    'entries': ['./client/js/application.js'],
    'dest': 'client/build/js',
    'bundleName': 'app.js',
    'sourcemap': true
  },
  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }
};