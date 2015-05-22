'use strict';

// Location controller
angular.module('waves')
    .controller('LocationController', ['$scope', '$stateParams', '$location', '$http', 'lodash','ngAutocomplete',
        function ($scope, $stateParams, $location, $http, lodash, autoComplete) {

            var reverseGeoCodeUrl = 'http://nominatim.openstreetmap.org/reverse?format=json&lat=-33.8008057&lon=151.2892903&zoom=18&addressdetails=1';

            $scope.currentLocation = {};

            $scope.setLocationFromCurrentPosition = function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                            $scope.currentLocation.Latitude = position.coords.latitude;
                            $scope.currentLocation.Longitude = position.coords.longitude;
                            reverseGeoCode();
                            $scope.$apply();
                        },
                        function (error) {
                            console.log(error);
                        });
                }
            };

        
            $scope.setLocation = function (latitude, longitude) {
                $scope.currentLocation.Latitude = latitude;
                $scope.currentLocation.longitude = longitude;
            }

            var reverseGeoCode = function () {
                $http.get(reverseGeoCodeUrl).
                    success(function (data, status, headers, config) {
                    $scope.currentLocation.Suburb = data.address.suburb;
                    $scope.currentLocation.State = data.address.state;
                    $scope.currentLocation.Country = data.address.country;
                }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
            };
        }
    ]);
