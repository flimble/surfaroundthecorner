'use strict';
var servicesModule = require('./index');
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
servicesModule.factory('WavesRestClientService', WavesRestClientService);