'use strict';

(function() {
	// Waves Controller Spec
	describe('Decimal Degree Calculator Test', function() {
		it('should calculate correctly',(function() {
			var calc = new decimaldegreecalculator();
			var result = calc.degreesminutesdirection(33, 43.419,'S');

			expect(result).toEqual(-33.80532);
		}));
	});
}());
