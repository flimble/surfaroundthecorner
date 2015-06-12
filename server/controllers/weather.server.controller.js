'use strict';

/**
 * Module dependencies.
 */
var wunderground = require('wunderground')('66ace129eb67cf88'),
    request = require('request'),
    errorHandler = require('./errors.server.controller'),
    _ = require('lodash'),
    mhl = require('mhl-buoy-data'),
    qs = require('querystring');

exports.conditions = function(req, res) {

    var state = req.query.state;
    var city = req.query.city;
};

exports.conditions = function(req, res) {



    var swellCastUrl = 'http://swellcast.com.au/api/v1';
    var api_key = 'qb3PSGuZ53NCKRXTrsQA';

    //get states
    var statesUrl = swellCastUrl + '/states.json?api_key=' + api_key;
    request(statesUrl, function(error, response, body) {
        var stateId = _.result(_.find(response, {'name': req.query.state}), 'id');

        //get cities
        var citiesUrl = swellCastUrl + '/states/' + stateId + '.json?api_key=' + api_key;
        request(citiesUrl, function(error, response, body) {
            var locationId = _.result(_.find(response, {'name': req.query.city}), 'id');


            var forecastUrl = swellCastUrl + '/locations/' + locationId + '.json?api_key=' + api_key;
            request(forecastUrl, function(error, response, body) {
                res.send(body);
            });

        });

    });

};
