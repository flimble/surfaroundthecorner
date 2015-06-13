'use strict';

var controllersModule = require('./index');
/**
 * @ngInject
 */
function LocationController($scope, $stateParams, $location, $http, _, WeatherRestClientService, async) {


    $scope.currentLocation = {};
    $scope.currentLocation.Address = {};
    $scope.currentLocation.Swell = {};


    $scope.currentLocationIsSet = function() {
        return !($scope.currentLocation.Latitude === undefined || $scope.currentLocation.Longitude === undefined);
    };

    /*$scope.autocompleteOptions = {
        types: '(regions)'
    };*/

    $scope.setLocationFromCurrentPosition = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.$apply(function() {
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;
                        updateLocationInformation(latitude, longitude, function() {
                            $scope.autocomplete = $scope.currentLocation.Address.string;
                        });

                    });

                },
                function(error) {
                    console.log(error);
                });
        }
    };

    $scope.$watch('details', function(place) {
        if (place) {
            var latlng = place.geometry.location;
            var latitude = latlng.A;
            var longitude = latlng.F;
            updateLocationInformation(latitude, longitude);
        }
    });



    var clearLocationInformation = function() {
        $scope.currentLocation.Address = {};
        $scope.currentLocation.Swell = {};
    };

    $scope.clearLocationInformation = function() {
        clearLocationInformation();
        $scope.autocomplete = null;
    };

    var updateLocationInformation = function(latitude, longitude, next) {
        clearLocationInformation();
        setLocation(latitude, longitude);
        reverseGeoCode(latitude, longitude, function() {
            console.log('waiting for weather information...');
            getWeatherInformation($scope.currentLocation.Address.State, $scope.currentLocation.Address.City, function() {
                console.log('both finished');
                if (next) next();
            });
        });
    };

    var setLocation = function(latitude, longitude) { //latitude before longitude to match google maps definition
        $scope.currentLocation.Latitude = latitude;
        $scope.currentLocation.Longitude = longitude;
    };

    var formattedAddress = function() {
        var address = $scope.currentLocation.Address;
        var addressArray = [address.Suburb, address.State, address.Country];
        return addressArray.filter(function(val) {
            return val;
        }).join(', ');

    };

    var reverseGeoCode = function(latitude, longitude, next) {
        var reverseGeoCodeUrl = 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude + '&zoom=18&addressdetails=1';
        $http.get(reverseGeoCodeUrl).
        success(function(data, status, headers, config) {
            $scope.currentLocation.Address.Suburb = data.address.suburb;
            $scope.currentLocation.Address.State = data.address.state;
            $scope.currentLocation.Address.Country = data.address.country;
            $scope.currentLocation.Address.City = data.address.city;
            var addressArray = [data.address.suburb, data.address.state, data.address.country];
            $scope.currentLocation.Address.string = addressArray.filter(function(val) {
                return val;
            }).join(', ');
            if (next) next();
        }).
        error(function(data, status, headers, config) {
            console.log(data);
        });
    };

    var getWeatherInformation = function(state, city, next) {
        WeatherRestClientService.get({
            state: state,
            city: city
        }).$promise.then(function(data) {
            $scope.currentLocation.Swell = data;
            console.log('weather info finished');
            if (next) next();
        });
    };

}

controllersModule.controller('LocationController', LocationController);
