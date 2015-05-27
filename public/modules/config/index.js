'use strict';
var angular = require('angular');

module.exports = angular.module('app.interceptors', []);

require('./authenticationinterceptor.config.js');
require('./errorhandlinginterceptor.config.js');