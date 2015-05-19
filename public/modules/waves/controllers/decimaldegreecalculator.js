'use strict';
var _ = require('lodash');

var decimaldegreecalculator = function(){
    var self = this;
};

self.degreesminutesdirection = function(degrees, minutes, direction) {
    var validDirections = ['N','E','S','W'],
        negativeDirections = ['W','S'];

    if(_.indexOf(validDirections, direction) === -1) throw "invalid direction"

    degrees = degrees || 0;
    minutes = minutes || 0;

    y = parseFloat(degrees)+parseFloat(minutes)/60;
    y = roundnum(y,6);


    if(_.indexOf(negativeDirections, direction) !== -1){
        return y * -1;
    }
    return y;
};

module.exports = decimaldegreecalculator;
