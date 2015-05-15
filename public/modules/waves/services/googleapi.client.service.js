'use strict';

//Waves service used to communicate Waves REST endpoints
angular.module('waves').factory('googleApiProvider', ['$resource',
    function($resource) {
        var gapiBaseUrl = 'https://maps.googleapis.com/maps/api';
        var apiKey = 'AIzaSyCSBGw0kiu_Nv3dPOBxxanMjuDyjEVA3aY';

        return {
            distanceMatrix: $resource(gapiBaseUrl + '/distancematrix/json', {}, {
                query: {
                    method: 'GET', params: { API_KEY: apiKey}, isArray: false
                }
            })/*,
            countries: $resource('../data/countries.json', {}, {
                query: {method: 'GET', params: {}, isArray: false}
            })*/
        }
    }
]);
