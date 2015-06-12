'use strict';

var Q = require('querystring'),
    request = require('request');


var Client = function(api_key) {
  if(!api_key || api_key == '') {
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


Client.prototype.states = function() {

};
