'use strict';

var Q = require('querystring'),
    request = require('request');


var Client = function(api_key) {
    if (!api_key || api_key == '') {
        throw new Error('No SwellCast API key provided');
    }
    this.key = api_key;
    this.uri = {
        protocol: 'http://',
        base: 'swellcast.com.au/api/v1',
        version: 'v1'
        format: '.json'
    }
};



Client.prototype.states = function(callback) {
  var self = this;
  return _execute(self._buildUrl('states'), callback);
}

Client.prototype.cities = function(stateId, callback) {
  var self = this;
  return _execute(self._buildUrl('states/' + stateId), callback);
}

Client.prototype.forecast = function(locationId, callback) {
  var self = this;
  return _execute(self._buildUrl('locations/' + locationId), callback);
}

Client.prototype._buildUrl = function(urlFragment) {
    var self = this;
    return self.uri.protocol + self.uri.base + '/' + self.uri.version + '/' + urlFragment + '.json?api_key=' + self.key;
}

Client.prototype._execute = function(url, callback) {
    var self = this;
    request(url, function(err, body, res) {
        if (!err) {
            if (res && res.response && res.response.error) {
                return callback(res.response);
            } else return cbk(null, res);
        } else {
            return callback(err);
        }
    });
};

module.exports = Client;