'use strict';
var angular = require('angular');

require('angular-resource');
require('angular-cookies');
require('angular-touch');
require('ui-router');
require('angular-bootstrap');
require('ng-autocomplete');


var _ = require('lodash'),
GoogleMapsLoader = require('google-maps');
require('./uiselect');
require('./directives');
require('./controllers');
require('./services');


// create and bootstrap application
angular.element(document).ready(function() {

	var requires = [
		'ui.router',
		'ngResource',
		'ngCookies',
		'ui.router',
		'ui.bootstrap',
		'ui.select',		
		'ngAutocomplete',
		'app.directives',
		'app.services',
		'app.controllers'
	];

	// mount on window for testing
	window.app = angular.module('app', requires);
	
	angular.module('app').constant('_', _);
	angular.module('app').constant('GoogleMapsLoader', GoogleMapsLoader);
	//angular.module('app').constant('jQuery', jQuery);


	angular.module('app').config(require('./config/html5location.config.js'));
	angular.module('app').config(require('./config/routes.config.js'));
	angular.module('app').config(require('./config/authentication.interceptor.js'));
	angular.module('app').config(require('./config/errorhandling.interceptor.js'));



	angular.bootstrap(document, ['app']);

	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

});