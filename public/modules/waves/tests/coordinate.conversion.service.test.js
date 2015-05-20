'use strict';

(function () {
    describe('Coordinate Conversion Factory Tests', function () {


        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        var underTest;
        beforeEach(inject(function (coordinateConversionFactory) {
            underTest = coordinateConversionFactory;
        }));



        describe('Convert South degrees minutes location', function () {
            it('should convert degrees and minutes to negative decimal', function (underTest) {

                var result = new underTest().ddm.toDecimal(33, 48.319, 'S');
                expect(result).toEqual(-33.80532);

            });
        });

        describe('Convert to degrees minutes direction', function () {
            it('should convert degrees and minutes to decimal', function (underTest) {
                var result = new underTest().ddm.stringToDecimal('151° 15.153\' E');
                expect(result).toEqual(151.2526);
            });
        });
    });
}());
