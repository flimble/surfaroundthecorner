'use strict';

var angular = require('angular');
var bulk = require('bulk-require');


module.exports = angular.module('app.config', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);