'use strict';

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

angular.module('app.services', []).factory('Articles', Articles);