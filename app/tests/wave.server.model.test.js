'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Wave = mongoose.model('Wave');

/**
 * Globals
 */
var user, wave;

/**
 * Unit tests
 */
describe('Wave Model Unit Tests:', function() {
	beforeEach(function(done) {

			wave = new Wave({
				Name: 'Wave Name'
			});
			done();
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return wave.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			wave.Name = '';

			return wave.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Wave.remove().exec();

		done();
	});
});
