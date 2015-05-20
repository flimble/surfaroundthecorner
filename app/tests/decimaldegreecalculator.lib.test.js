'use strict';
/* jshint -W100 */
/**
 * Module dependencies.
 */
var should = require('should'),
    _ = require('lodash'),
    calculator = require('./../lib/DecimalDegreeCalculator.js');

//global variables
var underTest

describe('decimal degree calculator tests:', function() {
    beforeEach(function(done) {
        // Create user credentials
        underTest = new calculator();
        done();
    });

    describe('Convert to degrees minutes direction', function() {
        it('should convert degrees and minutes to decimal', function(done) {

            var result = underTest.degreesminutesdirection(33, 48.319, 'N');
            should.equal(result, 33.80532, 'should equal 33.80532');
            done();
        });

    });

    describe('Convert South degrees minutes location', function() {
        it('should convert degrees and minutes to negative decimal', function(done) {

            var result = underTest.degreesminutesdirection(33, 48.319, 'S');
            should.equal(result, -33.80532, 'should equal 33.80532');
            done();
        });

    });

    describe('Convert to degrees minutes direction', function() {
        it('should convert degrees and minutes to decimal', function(done) {
            var result = underTest.degreesminutesdirectionString('151° 15.153\' E');
            should.equal(result, 151.2526, 'expected: 151.2526 actual: ' + result);
            done();
        });

    });



});
