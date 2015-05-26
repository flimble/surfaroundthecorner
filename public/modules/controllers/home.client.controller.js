'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function HomeController($scope, $location, Authentication) {
	// This provides Authentication context.
	$scope.authentication = Authentication;

	if ($scope.authentication.user) {
		console.log('logged in. directing to waves page');
		$location.path('/waves-by-region');
	}
}

controllersModule.controller('HomeController', HomeController);