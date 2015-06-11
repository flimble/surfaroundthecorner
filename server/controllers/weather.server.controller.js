'use strict';

/**
 * Module dependencies.
 */
var wunderground = require('wunderground')('66ace129eb67cf88'),
request = require('request'),
errorHandler = require('./errors.server.controller'),
_ = require('lodash');

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

