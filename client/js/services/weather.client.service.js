'use strict';
var servicesModule = require('./index');
// Weather service used for communicating with the weather REST endpoint

/**
 * @ngInject
 */
function WeatherRestClientService($resource) {
	return $resource('weather', {}, {
		update: {
			method: 'PUT'
		}
	});
}

servicesModule.factory('WeatherRestClientService', WeatherRestClientService);