'use strict';
var controllersModule = require('./index');
/**
 * @ngInject
 */
function HeaderController($scope, Authentication, Menus) {
	$scope.authentication = Authentication;
	$scope.isCollapsed = false;
	$scope.menu = Menus.getMenu('topbar');

	$scope.toggleCollapsibleMenu = function() {
		$scope.isCollapsed = !$scope.isCollapsed;
	};

	// Collapsing the menu after navigation
	$scope.$on('$stateChangeSuccess', function() {
		$scope.isCollapsed = false;
	});
}

controllersModule.controller('HeaderController', HeaderController);