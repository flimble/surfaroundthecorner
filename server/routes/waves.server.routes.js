'use strict';

module.exports = function(app) {
	var users = require('../../server/controllers/users.server.controller');
	var waves = require('../../server/controllers/waves.server.controller');
	var geolocation = require('../../server/controllers/geolocation.server.controller');

	// Waves Routes
	app.route('/waves')
		.get(waves.list)
		.post(users.requiresLogin, waves.create);

	app.route('/waves/:waveId')
		.get(waves.read)
		.put(users.requiresLogin, waves.update)//passed true for waves.hasAuthorization
		.delete(users.requiresLogin, waves.hasAuthorization, waves.delete);


	app.route('/distance')
		.get(geolocation.distance);

	// Finish by binding the Wave middleware
	app.param('waveId', waves.waveByID);


};
