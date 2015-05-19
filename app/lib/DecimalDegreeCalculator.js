'use strict';
var _ = require('lodash');

// DecimalDegreeCalculator.js
var DecimalDegreeCalculator = function () {};

function roundnum(x,p) {
    var i;
    var n=parseFloat(x);
    var m=n.toPrecision(p+1);
    var y=String(m);
    i=y.indexOf('e');
    if( i===-1 )	i=y.length;
    var j=y.indexOf('.');
    if( i>j && j!==-1 )
    {
        while(i>0)
        {
            if(y.charAt(--i)==='0')
                y = removeAt(y,i);
            else
                break;
        }
        if(y.charAt(i)==='.')
            y = removeAt(y,i);
    }
    return y;
}


var degreesminutesdirection = function (degrees, minutes, direction) {
    var validDirections = ['N', 'E', 'S', 'W'],
        negativeDirections = ['W', 'S'];

    if (_.indexOf(validDirections, direction) === -1) throw 'invalid direction';

    degrees = degrees || 0;
    minutes = minutes || 0;

    var y = parseFloat(degrees) + parseFloat(minutes) / 60;
    y = roundnum(y, 6);


    if (_.indexOf(negativeDirections, direction) !== -1) {
        return y * -1;
    };
    return y;
};


DecimalDegreeCalculator.prototype.degreesminutesdirection = degreesminutesdirection;

DecimalDegreeCalculator.prototype.degreesminutesdirectionString = function(inputString) {

    if(!inputString) return 0;

    var s = inputString.replace(/\s/g, '');
    s = s.replace('°','|').replace('\'','|');
    var arr = s.split('|');

    return degreesminutesdirection(arr[0], arr[1], arr[2]);
};

module.exports = DecimalDegreeCalculator;

