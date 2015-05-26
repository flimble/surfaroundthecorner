'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

bulk(__dirname, ['./**/!(*_index|*.spec).js']);