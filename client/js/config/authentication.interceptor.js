'use strict';

/**
 * @ngInject
 */
function AuthenticationInterceptor($httpProvider) {

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	// Set the httpProvider "not authorized" interceptor
	$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
		function($q, $location, Authentication) {
			return {
				responseError: function(rejection) {
					switch (rejection.status) {
						case 401:
							// Deauthenticate the global user
							Authentication.user = null;

							// Redirect to signin page
							$location.path('signin');
							break;
						case 403:
							// Add unauthorized behaviour 
							break;
					}

					return $q.reject(rejection);
				}
			};
		}
	]);
}

module.exports = AuthenticationInterceptor;