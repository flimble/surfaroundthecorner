'use strict';

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

angular.module('app.controllers', []).controller('HomeController', HomeController);