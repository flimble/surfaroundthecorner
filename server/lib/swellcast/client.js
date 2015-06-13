'use strict';

var Q = require('querystring'),
    request = require('request');


var Client = function(api_key, debug) {

    if (!api_key || api_key === '') {
        throw new Error('No SwellCast API key provided');
    }
    if (debug) console.log('starting client');

    var self = this;
    self.key = api_key;
    self.debug = debug;
    self.uri = {
        protocol: 'http://',
        base: 'swellcast.com.au/api',
        version: 'v1',
        format: '.json'
    };

    var _buildUrl = function(path) {
        return self.uri.protocol + self.uri.base + '/' + self.uri.version + '/' + path + self.uri.format + '?api_key=' + self.key;
    };

    var _get = function(path, callback) {
        var url = _buildUrl(path);

        if (self.debug) console.log('get: ' + url);

        request(url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                if (self.debug) console.log('response body: ' + body);
                try {
                    body = JSON.parse(body);
                    callback(error, body);
                } catch (err) {
                    callback('Invalid JSON response', body);
                }
            } else if (error) {
                console.log('error: ' + error);
            }

        });
    };

    self.states = function(callback) {
        return _get('states', callback);
    };

    self.cities = function(stateId, callback) {
        return _get('states/' + stateId, callback);
    };

    self.forecast = function(locationId, callback) {
        return _get('locations/' + locationId, callback);
    };



};



module.exports = Client;
