'use strict';
var interceptorsModule = require('./index');
// Config HTTP Error Handling

/**
 * @ngInject
 */
function ErrorHandlingInterceptor($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

module.exports = ErrorHandlingInterceptor;