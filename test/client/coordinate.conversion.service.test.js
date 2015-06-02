'use strict';
/* jshint -W100 */
(function () {
    describe('Coordinate Conversion Factory Tests', function () {


        beforeEach(module('app'));

        var UnderTest;

        beforeEach(inject(function (coordinateConversionFactory) {
            UnderTest = coordinateConversionFactory;
        }));



        describe('Convert South degrees minutes location', function () {
            it('should convert degrees and minutes to negative decimal', function (UnderTest) {

                var result = new UnderTest().ddm.toDecimal(33, 48.319, 'S');
                expect(result).toEqual(-33.80532);

            });
        });

        describe('Convert to degrees minutes direction', function () {
            it('should convert degrees and minutes to decimal', function (UnderTest) {
                var result = new UnderTest().ddm.stringToDecimal('151° 15.153\' E');
                expect(result).toEqual(151.2526);
            });
        });
    });
}());
