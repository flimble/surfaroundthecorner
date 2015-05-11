'use strict';

//Setting up route
angular.module('waves').config(['$stateProvider',
	function($stateProvider) {
		// Waves state routing
		$stateProvider.
		/*state('listWaves', {
			url: '/waves',
			templateUrl: 'modules/waves/views/list-waves.client.view.html'
		}).*/
		state('createWave', {
			url: '/waves/create',
			templateUrl: 'modules/waves/views/create-wave.client.view.html'
		}).
		state('viewWave', {
			url: '/waves/:waveId',
			templateUrl: 'modules/waves/views/view-wave.client.view.html'
		}).
		state('editWave', {
			url: '/waves/:waveId/edit',
			templateUrl: 'modules/waves/views/edit-wave.client.view.html'
		}).
		state('byregionWave', {
				url: '/waves-by-region',
				templateUrl: 'modules/waves/views/findmynearest-waves.client.view.html'
		});
	}
]);
