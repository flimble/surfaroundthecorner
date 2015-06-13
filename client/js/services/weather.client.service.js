'use strict';
var servicesModule = require('./index');
// Weather service used for communicating with the weather REST endpoint

/**
 * @ngInject
 */
function WeatherRestClientService($resource) {
	return $resource('swell', {}, {
		update: {
			method: 'PUT'
		}
	});
}

servicesModule.factory('WeatherRestClientService', WeatherRestClientService);


