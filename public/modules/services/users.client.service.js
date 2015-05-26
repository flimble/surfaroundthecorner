'use strict';

// Users service used for communicating with the users REST endpoint

/**
 * @ngInject
 */
function Users($resource) {
	return $resource('users', {}, {
		update: {
			method: 'PUT'
		}
	});
}

angular.module('app.services', []).factory('Users', Users);