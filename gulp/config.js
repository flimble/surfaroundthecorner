'use strict';

module.exports = {

  'serverport': 3000,

  'styles': {
    'src' : 'client/styles/*.less',
    'dest': 'build/css'
  },

  'scripts': {
    'src' : ['client/*.js','client/modules/**/*.js'] ,
    'dest': 'build/js'
  },

  'images': {
    'src' : 'client/images/**/*',
    'dest': 'build/images'
  },

  'fonts': {
    'src' : ['client/fonts/**/*'],
    'dest': 'build/fonts'
  },
  'clientViews': {
    'watch': [      
      'client/views/**/*.html'
    ],
    'src': 'client/views/**/*.html',
    'dest': 'app/js'
  },
  'serverViews': {
    'watch': [      
      'server/views/**/*.html'
    ],
    'src': 'server/views/**/*.html',
    'dest': 'app/js'
  },
  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'build/',
    'options': {}
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
