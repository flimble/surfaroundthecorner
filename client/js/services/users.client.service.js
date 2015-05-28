'use strict';
var servicesModule = require('./index');
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

servicesModule.factory('Users', Users);