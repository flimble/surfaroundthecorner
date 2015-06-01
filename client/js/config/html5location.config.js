'use strict';

// Setting HTML5 Location Mode
/**
 * @ngInject
 */
function HtmlLocationMode($locationProvider) {
	$locationProvider.hashPrefix('!');
}
module.exports = HtmlLocationMode;