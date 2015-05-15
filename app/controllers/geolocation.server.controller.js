'use strict';

/**
 * Module dependencies.
 */
var distance = require('google-distance');

exports.distance = function(req, res) {

    distance.get(
        {
            origin: req.param('origin'),
            destination: req.param('destination')
        },
        function(err, data) {
            if (err) return console.log(err);
            console.log(data);
            res.send(data);
        });
};
