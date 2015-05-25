'use strict';

require('angular');
// Init the application configuration module for AngularJS application

// Init module configuration options
var appName = 'SurfAroundTheCorner';
module.exports.applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ui.select', 'ngLodash', 'ngFitText', 'ngMap'];

module.exports.applicationModuleName = appName;
// Add a new vertical module
module.exports.registerModule = function(moduleName, dependencies) {
	// Create angular module
	angular.module(moduleName, dependencies || []);

	// Add the module to the AngularJS configuration file
	angular.module(appName).requires.push(moduleName);
};