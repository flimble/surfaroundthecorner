'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	decimalCalc = require('./../lib/DecimalDegreeCalculator.js'),
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
	LatitudeDecimal: {
		type: Number,
		default: 0
	},
	LongitudeDecimal: {
		type: Number,
		default: 0
	}
});

mongoose.model('Wave', WaveSchema);
