'use strict';
var controllersModule = require('./index'),
    GoogleMapsLoader = require('google-maps');

/* global google */
/**
 * @ngInject
 */
function WavesController($scope, $stateParams, $location, WavesRestClientService, _, coordinateConversionFactory, GoogleMapsLoader) {

    $scope.$on('mapInitialized', function(event, eventmap) {
        console.log('loading map');
        $scope.map = eventmap;
    });



    //$scope.wave = {};
    $scope.swell = {};
    $scope.swell.availableCompassDirections = ['NorthEast', 'East', 'SouthEast', 'South'];
    $scope.swell.compassDirectionsSelected = [];

    $scope.wind = {};
    $scope.wind.availableCompassDirections = ['North', 'NorthEast', 'East', 'SouthEast', 'South', 'SouthWest', 'West', 'NorthWest'];
    $scope.wind.compassDirectionsSelected = [];

    $scope.location = {};
    $scope.location.availableLocations = [{
        name: 'CentralCoast',
        state: 'New South Wales'
    }, {
        name: 'SydneyNorth',
        state: 'New South Wales'
    }, {
        name: 'SydneySouth',
        state: 'New South Wales'
    }, {
        name: 'SouthCoast',
        state: 'New South Wales'
    }, {
        name: 'Somewhere',
        state: 'Queensland'
    }];
    $scope.location.selected = {};


    $scope.location.availableLocationsStateGroupBy = function(item) {
        return item.state;
    };

    $scope.createWave = {};
    $scope.createWave.SwellDirection = [];
    $scope.createWave.WindDirection = [];

    // Create new Wave
    $scope.create = function() {
        // Create new Wave object
        var wave = new WavesRestClientService({
            Name: this.Name,
            CountryCode: this.CountryCode,
            Experience: this.Experience,
            Quality: this.Quality,
            Region: this.Region,
            State: this.State,
            SwellDirection: $scope.createWave.SwellDirection,
            SwellSize: this.SwellSize,
            TideMovement: this.TideMovement,
            TidePosition: this.TidePosition,
            WindDirection: $scope.createWave.WindDirection,
            WaveType: this.WaveType,
            WaveDirection: this.WaveDirection
        });


        // Redirect after save
        wave.$save(function(response) {
            $location.path('waves/' + response._id);

            // Clear form fields
            $scope.createWave.SwellDirection = [];
            $scope.createWave.WindDirection = [];

        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };



    // Remove existing Wave
    $scope.remove  = function(wave) {
        if (wave) {
            wave.$remove();

            for (var i in $scope.waves) {
                if ($scope.waves[i] === wave) {
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
        $scope.waves = WavesRestClientService.query();
    };


    $scope.findByConditions = function(region, swellDirection, windDirection) {
        WavesRestClientService.query().$promise.then(function(data) {
            var selectedWaves = [];

            data.forEach(function(item) {
                if (region.name.length > 0 && region.name !== item.Region) {
                    return;
                }
                if (item.SwellDirection.length === 0 || item.SwellDirection.length === 0) {
                    return;
                }
                if (swellDirection.length > 0 && (_.intersection(swellDirection, item.SwellDirection) === 0)) {
                    return;
                }
                if (item.WindDirection.length === 0 || item.WindDirection[0].length === 0) {
                    return;
                }
                if (windDirection.length > 0 && (_.intersection(windDirection, item.WindDirection) === 0)) {
                    return;
                }
                selectedWaves.push(item);
            });
            $scope.waves = selectedWaves;
        });
    };

    $scope.join = function(a) {
        return a.join(',');
    };

    $scope.locations = function() {
        var destinations = ['Vancouver BC', 'Seattle'];
        var destinationsToParam = destinations.join('|');

    };


    $scope.splitCamelCaseToString = function(s) {
        return s.split(/(?=[A-Z])/).map(function(p) {
            return p.charAt(0).toUpperCase() + p.slice(1);
        }).join(' ');
    };

    $scope.refreshMapMarker = function() {
        GoogleMapsLoader.load(function(google) {
            var pos = new google.maps.LatLng($scope.wave.Latitude, $scope.wave.Longitude);

            $scope.map.setCenter(pos);
            $scope.marker.setMap(null);
            $scope.marker.setMap($scope.map);
            $scope.marker.position = pos;
        });

    };

    // Find existing Wave
    $scope.findOne = function() {
        WavesRestClientService.get({
            waveId: $stateParams.waveId
        }).$promise.then(function(data) {
            var wave = data;

            if (wave.Longitude && wave.Longitude.indexOf('\'') > -1) {
                var lng = coordinateConversionFactory.ddm.stringToDecimal(wave.Longitude);
                var lat = coordinateConversionFactory.ddm.stringToDecimal(wave.Latitude);
                wave.Longitude = lng;
                wave.Latitude = lat;
            }

            if ($scope.map) {
                GoogleMapsLoader.load(function(google) {
                    var pos = new google.maps.LatLng(wave.Latitude, wave.Longitude);

                    var marker = new google.maps.Marker({
                        position: pos,
                        map: $scope.map,
                        title: wave.Name,
                        draggable: true
                    });
                    $scope.marker = marker;
                    google.maps.event.addListener(marker, 'dragend', function(event) {
                        $scope.$apply(function() {
                            $scope.wave.Latitude = event.latLng.lat().toFixed(7);
                            $scope.wave.Longitude = event.latLng.lng().toFixed(7);
                        });
                    });

                    $scope.map.setCenter(pos);
                });
            }

            $scope.wave = wave;
        });
    };


}

controllersModule.controller('WavesController', WavesController);