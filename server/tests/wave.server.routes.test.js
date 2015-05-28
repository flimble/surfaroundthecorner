'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Wave = mongoose.model('Wave'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, wave;

/**
 * Wave routes tests
 */
describe('Wave CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});


		user.save(function() {
			wave = new Wave({
				Name: 'Wave Name'
			});

			done();
		});
	});

	it('should be able to save Wave instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = signinRes._id;

				// Save a new Wave
				agent.post('/waves')
					.send(wave)
					.expect(200)
					.end(function(waveSaveErr, waveSaveRes) {
						// Handle Wave save error
						if (waveSaveErr) done(waveSaveErr);

						// Get a list of Waves
						agent.get('/waves')
							.end(function(wavesGetErr, wavesGetRes) {
								// Handle Wave save error
								if (wavesGetErr) done(wavesGetErr);

								// Get Waves list
								var waves = wavesGetRes.body;

								// Set assertions
								//(waves[0].user._id).should.equal(userId);
								(waves[0].Name).should.match('Wave Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Wave instance if not logged in', function(done) {
		agent.post('/waves')
			.send(wave)
			.expect(401)
			.end(function(waveSaveErr, waveSaveRes) {
				// Call the assertion callback
				done(waveSaveErr);
			});
	});

	it('should not be able to save Wave instance if no name is provided', function(done) {
		// Invalidate name field
		wave.Name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = signinRes._id;

				// Save a new Wave
				agent.post('/waves')
					.send(wave)
					.expect(400)
					.end(function(waveSaveErr, waveSaveRes) {
						// Set message assertion
						(waveSaveRes.body.message).should.match('Please fill Wave name');
						
						// Handle Wave save error
						done(waveSaveErr);
					});
			});
	});

	it('should be able to update Wave instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = signinRes._id;

				// Save a new Wave
				agent.post('/waves')
					.send(wave)
					.expect(200)
					.end(function(waveSaveErr, waveSaveRes) {
						// Handle Wave save error
						if (waveSaveErr) done(waveSaveErr);

						// Update Wave name
						wave.Name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Wave
						agent.put('/waves/' + waveSaveRes.body._id)
							.send(wave)
							.expect(200)
							.end(function(waveUpdateErr, waveUpdateRes) {
								// Handle Wave update error
								if (waveUpdateErr) done(waveUpdateErr);

								// Set assertions
								(waveUpdateRes.body._id).should.equal(waveSaveRes.body._id);
								(waveUpdateRes.body.Name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Waves if not signed in', function(done) {
		// Create new Wave model instance
		var waveObj = new Wave(wave);

		// Save the Wave
		waveObj.save(function() {
			// Request Waves
			request(app).get('/waves')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Wave if not signed in', function(done) {
		// Create new Wave model instance
		var waveObj = new Wave(wave);

		// Save the Wave
		waveObj.save(function() {
			request(app).get('/waves/' + waveObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('Name', wave.Name);

					// Call the assertion callback
					done();
				});
		});
	});



	it('should not be able to delete Wave instance if not signed in', function(done) {
		// Set Wave user 
		wave.user = user;

		// Create new Wave model instance
		var waveObj = new Wave(wave);

		// Save the Wave
		waveObj.save(function() {
			// Try deleting Wave
			request(app).delete('/waves/' + waveObj._id)
			.expect(401)
			.end(function(waveDeleteErr, waveDeleteRes) {
				// Set message assertion
				(waveDeleteRes.body.message).should.match('User is not logged in');

				// Handle Wave error error
				done(waveDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Wave.remove().exec();
		done();
	});
});
