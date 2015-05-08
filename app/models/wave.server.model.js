'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Wave Schema
 */
var WaveSchema = new Schema({
	_id: {
		type: Schema.ObjectId
	},

	Name: {
		type: String,
		default: '',
		required: 'Please fill Wave name',
		trim: true
	},
	CountryCode: {
		type: String
	},
	Experience: {
		type: String
	},
	Quality: {
		type: String
	},
	State: {
		type: String
	},
	SwellSize: {
		type: String
	},
	TideMovement: {
		type: String
	},
	TidePosition: {
		type: String
	},
	WaveDirection: {
		type: String
	},
	WaveType: {
		type: String
	},
	SwellDirection: {
		type: Array
	},
	WindDirection: {
		type: Array
	}
});

mongoose.model('Wave', WaveSchema);
