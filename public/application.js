'use strict';
var angular = require('angular');
var ApplicationConfiguration = require('./config');

require('../common');
require('angular-resource');
require('angular-cookies');
require('angular-touch');
require('angular-sanitize');
require('ui-router');
require('angular-bootstrap');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');



//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)
// Setting HTML5 Location Mode
.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);
// create and bootstrap application
angular.element(document).ready(function() {

	var requires = [
		'ui.router',
		'ngResource',
		'ngCookies',
		'ui.router',
		'ui.bootstrap',
		'ui.utils',
		'ui.select',
		'ngFitText',
		'ngMap',
		'app.controllers',
		'app.services',
		'app.directives'
	];

	// mount on window for testing
	window.app = angular.module('app', requires);

	angular.module('app').config(require('./on_config'));

	angular.module('app').run(require('./on_run'));

	angular.bootstrap(document, ['app']);

	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

});

