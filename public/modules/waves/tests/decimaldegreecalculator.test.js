'use strict';

var calculator = require('decimaldegreecalculator'),
	_ = require('lodash');

(function() {
	// Waves Controller Spec
	describe('Decimal Degree Calculator Test', function() {
		it('should calculate correctly',(function() {
			var result = calculator.degreesminutesdirection(33, 43.419,'S');

			expect(result).toEqual(-33.80532);
		}));
	});
}());
