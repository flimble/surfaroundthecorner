'use strict';

/**
 * @ngInject
 */
function HtmlLocationMode($locationProvider) {
	$locationProvider.hashPrefix('!');
}
module.exports = HtmlLocationMode;