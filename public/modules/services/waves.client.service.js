'use strict';

//Waves service used to communicate Waves REST endpoints

/**
 * @ngInject
 */
function WavesRestClientService($resource) {
	return $resource('waves/:waveId', {
		waveId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}
angular.module('app.services', []).factory('WavesRestClientService', WavesRestClientService);