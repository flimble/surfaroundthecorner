'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var waves = require('../../app/controllers/waves.server.controller');
	var geolocation = require('../../app/controllers/geolocation.server.controller');

	// Waves Routes
	app.route('/waves')
		.get(waves.list)
		.post(users.requiresLogin, waves.create);

	app.route('/waves/:waveId')
		.get(waves.read)
		.put(users.requiresLogin, waves.update)//passed true for waves.hasAuthorization
		.delete(users.requiresLogin, waves.hasAuthorization, waves.delete);


	app.route('/distance/:origin/:destination')
		.get(geolocation.distance);

	// Finish by binding the Wave middleware
	app.param('waveId', waves.waveByID);


};
