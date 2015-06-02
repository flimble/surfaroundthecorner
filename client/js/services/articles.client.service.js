'use strict';
var servicesModule = require('./index');
//Articles service used for communicating with the articles REST endpoints

/**
 * @ngInject
 */
function Articles($resource) {
	return $resource('articles/:articleId', {
		articleId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	}); 
}

servicesModule.factory('Articles', Articles);