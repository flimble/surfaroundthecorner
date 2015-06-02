'use strict';

(function() {
	// Waves Controller Spec
	describe('Waves Controller Tests', function() {
		// Initialize global variables
		var WavesController,
  		map,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module('app'));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Waves controller.
			WavesController = $controller('WavesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Wave object fetched from XHR', inject(function(WavesRestClientService) {
			// Create sample Wave using the Waves service
			var sampleWave = new WavesRestClientService({
				Name: 'New Wave'
			});

			// Create a sample Waves array that includes the new Wave
			var sampleWaves = [sampleWave];

			// Set GET response
			$httpBackend.expectGET('waves').respond(sampleWaves);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.waves).toEqualData(sampleWaves);
		}));

		it('$scope.findOne() should create an array with one Wave object fetched from XHR using a waveId URL parameter', inject(function(WavesRestClientService) {
			// Define a sample Wave object
			var sampleWave = new WavesRestClientService({
				Name: 'New Wave'
			});

			// Set the URL parameter
			$stateParams.waveId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/waves\/([0-9a-fA-F]{24})$/).respond(sampleWave);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.wave).toEqualData(sampleWave);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(WavesRestClientService) {
			// Create a sample Wave object
			var expectedWavePostData = new WavesRestClientService({
				Name: 'New Wave',
				SwellDirection: ['South'],
				WindDirection: ['SouthWest']
			});

			// Create a sample Wave response
			var sampleWaveResponse = new WavesRestClientService({
				_id: '525cf20451979dea2c000001',
				Name: 'New Wave'
			});

			// Fixture mock form input values
			scope.Name = 'New Wave';
			scope.createWave.SwellDirection = ['South'];
			scope.createWave.WindDirection = ['SouthWest'];

			// Set POST response
			$httpBackend.expectPOST('waves', expectedWavePostData).respond(sampleWaveResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.createWave.SwellDirection).toEqual([]);
			expect(scope.createWave.WindDirection).toEqual([]);


			// Test URL redirection after the Wave was created
			expect($location.path()).toBe('/waves/' + sampleWaveResponse._id);
		}));

		it('$scope.update() should update a valid Wave', inject(function(WavesRestClientService) {
			// Define a sample Wave put data
			var sampleWavePutData = new WavesRestClientService({
				_id: '525cf20451979dea2c000001',
				Name: 'New Wave'
			});

			// Mock Wave in scope
			scope.wave = sampleWavePutData;

			// Set PUT response
			$httpBackend.expectPUT(/waves\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/waves/' + sampleWavePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid waveId and remove the Wave from the scope', inject(function(WavesRestClientService) {
			// Create new Wave object
			var sampleWave = new WavesRestClientService({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Waves array and include the Wave
			scope.waves = [sampleWave];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/waves\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleWave);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.waves.length).toBe(0);
		}));


		it('single matching condition returns single result', inject(function (WavesRestClientService) {

			scope.waves = [];

			$httpBackend.expectGET('waves')
				.respond([{
					Name: 'Hello',
					Region: 'SydneyNorth',
					SwellDirection: ['SouthEast'],
					WindDirection: ['NorthEast']
				}]);

			scope.findByConditions({name: 'SydneyNorth' }, ['SouthEast'], ['NorthEast']);
			$httpBackend.flush();


			// Test scope value
			expect(scope.waves.length).toBe(1);
		}));



		it('findByConditions is filtered by region', inject(function (WavesRestClientService) {

			scope.waves = [];

			$httpBackend.expectGET('waves')
				.respond([{
					Name: 'Hello',
					Region: 'SydneyNorth',
					SwellDirection: ['SouthEast'],
					WindDirection: ['NorthEast']
				}]);

			scope.findByConditions({name: 'SydneySouth' }, ['SouthEast'], ['NorthEast']);
			$httpBackend.flush();


			// Test scope value
			expect(scope.waves.length).toBe(0);
		}));

		it('findByConditions is filtered by swelldirection', inject(function (WavesRestClientService) {

			scope.waves = [];

			$httpBackend.expectGET('waves')
				.respond([{
					Name: 'Hello',
					Region: 'SydneyNorth',
					SwellDirection: ['SouthEast'],
					WindDirection: ['NorthEast']
				}]);

			scope.findByConditions({name: 'SydneyNorth' }, ['SouthWest'], ['NorthEast']);
			$httpBackend.flush();


			// Test scope value
			expect(scope.waves.length).toBe(0);
		}));

		it('findByConditions is filtered by winddirection', inject(function (WavesRestClientService) {

			scope.waves = [];

			$httpBackend.expectGET('waves')
				.respond([{
					Name: 'Hello',
					Region: 'SydneyNorth',
					SwellDirection: ['SouthEast'],
					WindDirection: ['NorthEast']
				}]);

			scope.findByConditions({name: 'SydneyNorth' }, ['SouthEast'], ['NorthWest']);
			$httpBackend.flush();


			// Test scope value
			expect(scope.waves.length).toBe(0);
		}));

		it('findByConditions complex scenario', inject(function (WavesRestClientService) {

			scope.waves = [];

			var mockedQueryData = [
				{ Name: 'One', Region: 'SydneyNorth', SwellDirection: ['SouthEast','NorthEast','SouthWest'], WindDirection: ['NorthEast']}, //multiple
				{ Name: 'Two', Region: 'SydneyNorth', SwellDirection: ['SouthEast','SouthWest'], WindDirection: ['NorthEast']},
				{ Name: 'Three', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']},
				{ Name: 'Four', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']},
				{ Name: 'Five', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']},
				{ Name: 'Six', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']},
				{ Name: 'Seven', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']},
				{ Name: 'Eight', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']},
				{ Name: 'Nine', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']},
				{ Name: 'Ten', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']},
				{ Name: 'Eleven', Region: 'SydneyNorth', SwellDirection: ['SouthEast'], WindDirection: ['NorthEast']}
			];

			$httpBackend.expectGET('waves')
				.respond(mockedQueryData);

			scope.findByConditions({name: 'SydneyNorth' }, ['SouthEast','SouthWest'], ['NorthEast']);
			$httpBackend.flush();
			// Test scope value
			expect(scope.waves).toEqualData(mockedQueryData);
		}));

		it('first google api test', inject(function (WavesRestClientService) {

			/*.expect('GET', 'https://maps.googleapis.com/maps/api/distancematrix/json?API_KEY=AIzaSyCSBGw0kiu_Nv3dPOBxxanMjuDyjEVA3aY&destinations=Vancouver+BC%7CSeattle&origins=San+Francisco', null)
				.respond({
					Name: 'One'
				});

			scope.locations();
			$httpBackend.flush();
			*/

			// Test scope value
			//expect(scope.waves.length).toBe(1);
		}));
	});
}());

