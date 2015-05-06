'use strict';

// Waves controller
angular.module('waves').controller('WavesController', ['$scope', '$stateParams', '$location', 'Waves',
	function($scope, $stateParams, $location, Waves) {

		// Create new Wave
		$scope.create = function() {
			// Create new Wave object
			var wave = new Waves ({
				name: this.name
			});

			// Redirect after save
			wave.$save(function(response) {
				$location.path('waves/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Wave
		$scope.remove = function(wave) {
			if ( wave ) { 
				wave.$remove();

				for (var i in $scope.waves) {
					if ($scope.waves [i] === wave) {
						$scope.waves.splice(i, 1);
					}
				}
			} else {
				$scope.wave.$remove(function() {
					$location.path('waves');
				});
			}
		};

		// Update existing Wave
		$scope.update = function() {
			var wave = $scope.wave;

			wave.$update(function() {
				$location.path('waves/' + wave._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Waves
		$scope.find = function() {
			$scope.waves = Waves.query();
		};

		// Find existing Wave
		$scope.findOne = function() {
			$scope.wave = Waves.get({ 
				waveId: $stateParams.waveId
			});
		};
	}
]);