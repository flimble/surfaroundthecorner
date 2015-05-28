'use strict';

module.exports = {
  'serverport': 3000,

  'styles': {
    'src': 'client/styles/*.less',
    'dest': 'build/css',
    'sourcemap': true
  },
  'scripts': {
    'src': ['client/js/*.js', 'client/js/**/*.js'],
    'dest': 'build/js'
  },
  'images': {
    'src': 'client/images/**/*',
    'dest': 'build/images'
  },
  'fonts': {
    'src': ['client/fonts/**/*'],
    'dest': 'build/fonts'
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
    'bundleName': 'app.js',
    'sourcemap': true
  },
  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }
};