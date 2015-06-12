'use strict';

module.exports = function(app) {
	var weather = require('../../server/controllers/weather.server.controller');	
	

	app.route('/weather')
		.get(weather.conditions);	

	app.route('/swell')
		.get(weather.swell);	
		
};

