'use strict';
var angular = require('angular');

require('angular-resource');
require('angular-cookies');
require('angular-touch');
require('angular-sanitize');
require('ui-router');
require('angular-bootstrap');
var _ = require('lodash'),
GoogleMapsLoader = require('google-maps');
require('./controllers');
require('./services');


// Setting HTML5 Location Mode

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
	
	angular.module('app').constant('_', _);
	angular.module('app').constant('GoogleMapsLoader', GoogleMapsLoader);

	angular.module('app').config(require('./config/html5location.config.js'));
	angular.module('app').config(require('./config/routes.config.js'));
	angular.module('app').config(require('./config/authentication.interceptor.js'));
	angular.module('app').config(require('./config/errorhandling.interceptor.js'));



	angular.bootstrap(document, ['app']);

	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

});