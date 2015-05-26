require('angular');

require('./articles.client.service');
require('./authentication.client.service');
require('./coordinate.conversion.service');
require('./googleapi.client.service');
require('./menus.client.service');
require('./users.client.service');
require('./waves.client.service');

module.exports = angular.module('app.services', []);