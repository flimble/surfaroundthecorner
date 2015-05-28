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
	Name: {
		type: String,
		default: '',
		required: 'Please fill Wave name',
		trim: true,
		unique: true
	},
	CountryCode: {
		type: String,
		default:''
	},
	Experience: {
		type: String,
		default: ''

	},
	Quality: {
		type: String,
		default: ''
	},
	State: {
		type: String,
		default: ''

	},
	SwellSize: {
		type: String,
		default: ''
	},
	TideMovement: {
		type: String,
		default: ''
	},
	TidePosition: {
		type: String,
		default: ''
	},
	WaveDirection: {
		type: String,
		default: ''
	},
	WaveType: {
		type: String,
		default: ''
	},
	SwellDirection: {
		type: Array,
		default: []
	},
	WindDirection: {
		type: Array,
		default: []
	},
	Longitude: {
		type: String,
		default: ''
	},
	Latitude: {
		type: String,
		default: ''
	}
});

mongoose.model('Wave', WaveSchema);
