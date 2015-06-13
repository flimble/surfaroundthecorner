'use strict';

var Client = require('./client');

module.exports = function(api_key, debug) {
	return new Client(api_key, debug);
};