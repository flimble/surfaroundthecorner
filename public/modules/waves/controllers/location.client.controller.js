'use strict';

// Location controller
angular.module('waves')
    .controller('LocationController', ['$scope', '$stateParams', '$location','lodash',
        function ($scope, $stateParams, $location, lodash) {

            $scope.currentLocation = {};

            $scope.init = function() {
              if(navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position){
                      $scope.currentLocation.Latitude = position.coords.latitude;
                      $scope.currentLocation.Longitude = position.coords.longitude;
                      $scope.$apply();
                  },
                  function(error){
                      console.log(error);
                  });
              }
            };
        }
    ]);
