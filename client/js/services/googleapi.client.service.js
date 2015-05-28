'use strict';
var servicesModule = require('./index');
//Waves service used to communicate Waves REST endpoints
/**
 * @ngInject
 */
function googleApiProvider($resource, $http) {

    //  Wraps the callback function to convert the output to a javascript object
    var returnObjectFromJSON = function(callback) {
        if (typeof callback === 'function') {
            return function(err, jsonString) {

                if (err) {
                    callback(err);
                    return;
                }

                try {
                    callback(err, JSON.parse(jsonString));
                } catch (e) {
                    callback(e);
                }
            };
        }
        return false;
    };



    var gapiBaseUrl = 'https://maps.googleapis.com/maps/api';
    var apiKey = 'AIzaSyCSBGw0kiu_Nv3dPOBxxanMjuDyjEVA3aY';


    return {
        distanceMatrix: $resource('maps/distancematrix', {}, {
            query: {
                method: 'GET',
                params: {
                    API_KEY: apiKey
                },
                isArray: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            }
        }),
        distanceGet: function() {
            var dat;
            $http.jsonp(gapiBaseUrl + '/distancematrix/json?origins=Seattle&destinations=Sydney&callback=angular.callbacks._0').
            success(function(data) {
                console.log('1');
                console.log(data);
                dat = data;
            }).
            error(function(data) {
                alert('ERROR: Could not get data.');
            });
            console.log('2');
            console.log(dat);
            return dat;
        }
    };
}

servicesModule.factory('googleApiProvider', googleApiProvider);