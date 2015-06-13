'use strict';

/**
 * Module dependencies.
 */
var request = require('request'),
    wunderground = require('wunderground')('66ace129eb67cf88'),
    errorHandler = require('./errors.server.controller'),
    async = require('async'),
    _ = require('lodash'),
    mhl = require('mhl-buoy-data'),
    qs = require('querystring'),
    swellcast = require('../lib/swellcast')('qb3PSGuZ53NCKRXTrsQA'),
    geocoder = require('local-reverse-geocoder');


exports.conditions = function(req, res) {
    //-33.797511, 151.289283 sample url
    var query = {
        lat: req.query.lat,
        lng: req.query.lng
    };

    var actions = ['conditions'];
    wunderground.execute(actions, query, function(err, result) {
        res.send(result);
    });


};

exports.tides = function(req, res) {
    var query = {
        country: 'Australia',
        city: 'Sydney'
            //lat: -33.797511,
            //lng: 151.289283
    };

    wunderground.tide(query, function(err, result) {
        res.send(result);
    });

};

var getStates = function(callback) {
    swellcast.states(function(err, data) {
        callback(null, data);
    });
};

var getCitiesByState = function(state, city, cities, callback) {
    var stateId = _.result(_.find(cities, {
        'name': state
    }), 'id');

    swellcast.cities(stateId, function(err, data) {
        var locationId = _.result(_.find(data.locations, {
            'name': city
        }), 'id');

        callback(null, locationId);
    });
};

var getSwellData = function(locationId, callback) {
    swellcast.forecast(locationId, function(err, data) {

        callback(null, data);
    });
};

exports.swell = function(req, res) {
    async.waterfall([
            //getStates,
            //async.apply(getCitiesByState, req.query.state, req.query.city),
            async.apply(getSwellData, 6)
        ],
        function(err, result) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                return res.send(result);
            }
        });
};
