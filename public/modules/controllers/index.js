require('angular');

require('./articles.client.controller');
require('./authentication.client.controller');
require('./header.client.controller');
require('./home.client.controller');
require('./location.client.controller');
require('./password.client.controller');
require('./settings.client.controller');
require('./waves.client.controller');

module.exports = angular.module('app.controllers', []);