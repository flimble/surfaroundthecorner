'use strict';

module.exports = {
  'serverport': 3000,

  'clientLESS': {
    'src': 'client/styles/**/*.less',
    'dest': 'client/build/css',
    'sourcemap': true
  },
  'clientCSS': {
    'src': 'client/styles/**/*.css',
    'dest': 'client/build/css',
    'sourcemap': true
  },
  'clientJS': {
    'src': ['client/js/*.js', 'client/js/**/*.js']
  },
  'serverJS': {
    'src': ['gulpfile.js', 'server.js', 'gulp/**/*.js', 'config/**/*.js', 'server/**/*.js']
  },
  'images': {
    'src': 'client/images/**/*',
    'dest': 'client/build/images'
  },
  'fonts': {
    'src': ['client/fonts/**/*', 'client/vendor/bootstrap/fonts/*', 'client/vendor/font-awesome/fonts/*'],
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
    'src': 'client/build/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'client/build/',
    'options': {}
  },
  'dist': {
    'root': 'client/build'
  },
  'browserify': {
    'entries': ['./client/js/application.js'],
    'dest': 'client/build/js',
    'bundleName': 'app.js',
    'sourcemap': true
  },
  'test': {
    'karma': 'karma.conf.js',
    'protractor': 'protractor.conf.js'
  }
};