'use strict';

//Waves service used to communicate Waves REST endpoints
angular.module('waves').factory('Waves', ['$resource',
	function($resource) {
		return $resource('waves/:waveId', { waveId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);