'use strict';
var angular = require('angular');
var ApplicationConfiguration = require('./config');

require('angular-resource');
require('angular-cookies');
require('angular-touch');
require('angular-sanitize');
require('ui-router');
require('angular-bootstrap');



//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)

// Setting HTML5 Location Mode
.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
])
//Then define the init function for starting up the application
.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
