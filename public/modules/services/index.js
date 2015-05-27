require('angular');
var bulk = require('bulk-require');

module.exports = angular.module('app.services', []);

//bulk require services to save maintaining this files
//note: browserify bulkify transform required
bulk(__dirname, ['./**/!(*index|*.spec).js']); 




