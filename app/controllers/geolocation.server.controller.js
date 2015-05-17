'use strict';

/**
 * Module dependencies.
 */
var distance = require('google-distance'),
request = require('request'),
errorHandler = require('./errors.server.controller'),
_ = require('lodash');

exports.distance = function(req, res) {
    var distanceUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

    req.body.key = 'AIzaSyCSBGw0kiu_Nv3dPOBxxanMjuDyjEVA3aY';


    req.body.mode = req.body.mode || 'driving';
    req.body.mode = req.body.units || 'metric';

    request({ url: distanceUrl, qs: req.query, method: 'GET',  headers: { 'Content-Type': 'application/json' }},
        function(error, response, body){
        if(error) {
            res.status(400).send({
                message: errorHandler.getErrorMessage(error)
            });
        }
        else {
            if(body.status === 'INVALID_REQUEST') {
                res.status(401).send({
                    message: 'INVALID REQUEST'
                });
            } else {
                res.send(body);
            }
        }
    });
};
