'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		if ($scope.authentication.user) {
			console.log('logged in. directing to waves page');
			$location.path('/waves-by-region');
		}
	}
]);
