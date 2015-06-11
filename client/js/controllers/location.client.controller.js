'use strict';

var controllersModule = require('./index');
/**
 * @ngInject
 */
function LocationController($scope, $stateParams, $location, $http, _, WeatherRestClientService) {


    $scope.currentLocation = {};    
    $scope.currentLocation.Address = {};
    $scope.currentLocation.Weather = {};


    $scope.currentLocationIsSet = function() { 
       return !($scope.currentLocation.Latitude === undefined || $scope.currentLocation.Longitude === undefined);
    };

    /*$scope.autocompleteOptions = {
        types: '(regions)'
    };*/

    $scope.setLocationFromCurrentPosition = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    $scope.currentLocation.Latitude = latitude;
                    $scope.currentLocation.Longitude = longitude;
                    reverseGeoCode(latitude, longitude);         
                    getWeatherInformation(latitude, longitude);           
                    $scope.$apply();
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
            $scope.setLocation(latitude, longitude);
            reverseGeoCode(latitude, longitude);
            getWeatherInformation(latitude, longitude);
        }
    });


    $scope.setLocation = function(latitude, longitude) { //latitude before longitude to match google maps definition
        $scope.currentLocation.Latitude = latitude;
        $scope.currentLocation.longitude = longitude;
        $scope.autocomplete = null;
    };

    $scope.currentLocation.Address.Format = function() {
        var address = $scope.currentLocation.Address;
        var addressArray = [address.Suburb, address.State, address.Country];
        return addressArray.filter(function(val) {
            return val;
        }).join(', ');

    };

    var reverseGeoCode = function(latitude, longitude) {
        var reverseGeoCodeUrl = 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude + '&zoom=18&addressdetails=1';
        $http.get(reverseGeoCodeUrl).
        success(function(data, status, headers, config) {
            $scope.currentLocation.Address.Suburb = data.address.suburb;
            $scope.currentLocation.Address.State = data.address.state;
            $scope.currentLocation.Address.Country = data.address.country;
        }).
        error(function(data, status, headers, config) {
            console.log(data);
        });
    };

    var getWeatherInformation = function(latitude, longitude) {
        WeatherRestClientService.get({
            lat: latitude,
            lng: longitude
        }).$promise.then(function(data) {            
            $scope.currentLocation.Weather = data.current_observation;
        });
    };

}

controllersModule.controller('LocationController', LocationController);