'use strict';
var directivesModule = require('./index');
/**
 * @ngInject
 */
function selectize($timeout) {
	return {
		// Restrict it to be an attribute in this case
		restrict: 'A',
		// responsible for registering DOM listeners as well as updating the DOM
		link: function(scope, element, attrs) {
			$timeout(function() {
				angular.element(element).selectize(scope.$eval(attrs.selectize));
			});
		}
	};
}
directivesModule.directive('selectize', selectize);