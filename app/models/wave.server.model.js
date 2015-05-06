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
		trim: true
	}
});

mongoose.model('Wave', WaveSchema);