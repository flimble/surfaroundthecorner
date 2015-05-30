'use strict';

var angular = require('angular');
var bulk = require('bulk-require');
module.exports = angular.module('app.directives', []);

//bulk require controllers to save maintaining this files
//note: browserify bulkify transform required
bulk(__dirname, ['./**/!(*index|*.spec).js']); 