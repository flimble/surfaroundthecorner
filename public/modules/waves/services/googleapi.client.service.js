'use strict';

//Waves service used to communicate Waves REST endpoints
angular.module('waves').factory('googleApiProvider', ['$resource', '$http',
    function ($resource, $http) {

        //  Wraps the callback function to convert the output to a javascript object
        var returnObjectFromJSON = function(callback) {
            if (typeof callback === 'function') {
                return function(err, jsonString) {

                    if (err){
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

        function removeAt(s,i) {
            s = s.substring(0,i)+s.substring(i+1,s.length);
            return s;
        }

        function roundnum(x,p) {
            var i;
            var n=parseFloat(x);
            var m=n.toPrecision(p+1);
            var y=String(m);
            i=y.indexOf('e');
            if( i===-1 )	i=y.length;
            var j=y.indexOf('.');
            if( i>j && j!==-1 )
            {
                while(i>0)
                {
                    if(y.charAt(--i)==='0')
                        y = removeAt(y,i);
                    else
                        break;
                }
                if(y.charAt(i)==='.')
                    y = removeAt(y,i);
            }
            return y;
        };



        var degreesminutesdirection = function (degrees, minutes, direction) {
            var validDirections = ['N', 'E', 'S', 'W'],
                negativeDirections = ['W', 'S'];

            if (_.indexOf(validDirections, direction) === -1) throw 'invalid direction';

            degrees = degrees || 0;
            minutes = minutes || 0;

            var y = parseFloat(degrees) + parseFloat(minutes) / 60;
            y = roundnum(y, 6);


            if (_.indexOf(negativeDirections, direction) !== -1) {
                return y * -1;
            };
            return y;
        };




        var gapiBaseUrl = 'https://maps.googleapis.com/maps/api';
        var apiKey = 'AIzaSyCSBGw0kiu_Nv3dPOBxxanMjuDyjEVA3aY';


        return {
            distanceMatrix: $resource('maps/distancematrix', {}, {
                query: {
                    method: 'GET', params: {API_KEY: apiKey}, isArray: false, headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true
                    }
                }
            }),
            distanceGet: function () {
                var dat;
                $http.jsonp(gapiBaseUrl + '/distancematrix/json?origins=Seattle&destinations=Sydney&callback=angular.callbacks._0').
                    success(function (data) {
                        console.log('1');
                        console.log(data);
                        dat = data;
                    }).
                    error(function (data) {
                        alert('ERROR: Could not get data.');
                    });
                console.log('2');
                console.log(dat);
                return dat;
            },
            coordinates: {
                toDecimal: function (inputString) {
                    if(!inputString) return 0;

                    var s = inputString.replace(/\s/g, '');
                    s = s.replace('°','|').replace('\'','|');
                    var arr = s.split('|');

                    return degreesminutesdirection(arr[0],arr[1],arr[2]);
                }
            }
        };
    }
]);
