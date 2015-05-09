'use strict';

// Waves controller
angular.module('waves').controller('WavesController', ['$scope', '$stateParams', '$location', 'Waves', 'lodash',
	function($scope, $stateParams, $location, Waves, lodash) {

		$scope.swell = {};
		$scope.swell.availableCompassDirections = ['NorthEast', 'East', 'SouthEast', 'South'];
		$scope.swell.compassDirectionsSelected = [];

		$scope.wind = {};
		$scope.wind.availableCompassDirections = ['North', 'NorthEast', 'East', 'SouthEast', 'South', 'SouthWest', 'West', 'NorthWest'];
		$scope.wind.compassDirectionsSelected = [];

		$scope.location = {};
		$scope.location.availableLocations = [
			{name: 'CentralCoast', state: 'New South Wales'},
			{name: 'SydneyNorth', state: 'New South Wales'},
			{name: 'SydneySouth', state: 'New South Wales'},
			{name: 'SouthCoast', state: 'New South Wales'},
			{name: 'Somewhere', state: 'Queensland'},
		];
		$scope.location.selected = {name: 'SydneyNorth', state: 'New South Wales'};


		$scope.location.availableLocationsStateGroupBy = function (item) {
			return item.state;
		};

		// Create new Wave
		$scope.create = function () {
			// Create new Wave object
			var wave = new Waves({
				name: this.name
			});

			// Redirect after save
			wave.$save(function (response) {
				$location.path('waves/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Wave
		$scope.remove = function (wave) {
			if (wave) {
				wave.$remove();

				for (var i in $scope.waves) {
					if ($scope.waves [i] === wave) {
						$scope.waves.splice(i, 1);
					}
				}
			} else {
				$scope.wave.$remove(function () {
					$location.path('waves');
				});
			}
		};

		// Update existing Wave
		$scope.update = function () {
			var wave = $scope.wave;

			wave.$update(function () {
				$location.path('waves/' + wave._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Waves
		$scope.find = function () {
			$scope.waves = Waves.query();
		};

		$scope.findByConditions = function (region, swellDirection, windDirection) {
			Waves.query().$promise.then(function (data) {
				var selectedWaves = [];
				data.forEach(function (item) {
					if (region.name.length > 0 && region.name !== item.Region) {
						return;
					}
					if(item.SwellDirection.length == 0 || item.SwellDirection.length == 0)
					{
						return;
					}
					if (swellDirection.length > 0 && (lodash.intersection(swellDirection, item.SwellDirection) == 0)) {
						return;
					}
					if(item.WindDirection.length == 0 || item.WindDirection[0].length == 0) {
						return;
					}
					if (windDirection.length > 0 && (lodash.intersection(windDirection, item.WindDirection) == 0)) {
						return;
					}
					selectedWaves.push(item);
				});
				$scope.waves = selectedWaves;
			});
		}

		$scope.join = function (a) {
			return a.join(',');
		};


		function intersect(a, b) {
			var result = false;

			a.forEach(function (element) {
				if (lodash.contains(element, b)) {
					result = true;
				}

			});
			return result;
		}


		$scope.splitCamelCaseToString = function (s) {
			return s.split(/(?=[A-Z])/).map(function (p) {
				return p.charAt(0).toUpperCase() + p.slice(1);
			}).join(' ');
		};

		// Find existing Wave
		$scope.findOne = function () {
			$scope.wave = Waves.get({
				waveId: $stateParams.waveId
			});
		};
	}
]);
