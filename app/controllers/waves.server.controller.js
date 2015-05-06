'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	wave = mongoose.model('Wave'),
	_ = require('lodash');

/**
 * Create a wave
 */
exports.create = function(req, res) {
	var wave = new Wave(req.body);
	wave.user = req.user;

	wave.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wave);
		}
	});
};

/**
 * Show the current wave
 */
exports.read = function(req, res) {
	res.jsonp(req.wave);
};

/**
 * Update a wave
 */
exports.update = function(req, res) {
	var wave = req.wave ;

	wave = _.extend(wave , req.body);

	wave.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wave);
		}
	});
};

/**
 * Delete an wave
 */
exports.delete = function(req, res) {
	var wave = req.wave ;

	wave.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wave);
		}
	});
};

/**
 * List of Waves
 */
exports.list = function(req, res) { 
	wave.find().sort('Name').exec(function(err, waves) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(waves);
		}
	});
};

/**
 * wave middleware
 */
exports.waveByID = function(req, res, next, id) { 
	wave.findById(id).populate('user', 'displayName').exec(function(err, wave) {
		if (err) return next(err);
		if (! wave) return next(new Error('Failed to load wave ' + id));
		req.wave = wave ;
		next();
	});
};

/**
 * wave authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.wave.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
