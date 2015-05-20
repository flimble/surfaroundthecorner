'use strict';

//Waves service used to communicate Waves REST endpoints
angular.module('waves').factory('wavesQueryFactory', ['$resource',
	function($resource) {
		return $resource('waves/:waveId', { waveId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
