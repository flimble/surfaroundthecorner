'use strict';

var angular = require('angular');
require('angular-resource');
require('angular-cookies');
require('angular-touch');
require('angular-sanitize');
require('ui-router');
require('angular-bootstrap');



// Init the application configuration module for AngularJS application

// Init module configuration options
var appName = 'app';
module.exports.applicationModuleVendorDependencies = [
'ngResource', 
'ngCookies',  
'ui.router', 
'ui.bootstrap', 
'ui.utils', 
'ui.select', 
'ngFitText', 
'ngMap'
];

module.exports.applicationModuleName = appName;
// Add a new vertical module
module.exports.registerModule = function(moduleName, dependencies) {
	// Create angular module
	angular.module(moduleName, dependencies || []);

	// Add the module to the AngularJS configuration file
	angular.module(appName).requires.push(moduleName);
};