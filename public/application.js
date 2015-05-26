'use strict';
var angular = require('angular');

require('angular-resource');
require('angular-cookies');
require('angular-touch');
require('angular-sanitize');
require('ui-router');
require('angular-bootstrap');
require('./modules/controllers');
require('./modules/services');


// Setting HTML5 Location Mode
/*.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);*/
// create and bootstrap application
angular.element(document).ready(function() {

	var requires = [
		'ui.router',
		'ngResource',
		'ngCookies',
		'ui.router',
		'ui.bootstrap',
		'app.services',
		'app.controllers'
		
	];

	// mount on window for testing
	window.app = angular.module('app', requires);

	angular.module('app').config(require('./routes.js'));

	angular.bootstrap(document, ['app']);

	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

});

