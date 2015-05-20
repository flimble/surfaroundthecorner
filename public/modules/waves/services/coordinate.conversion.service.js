'use strict';

angular.module('waves').factory('coordinateConversionFactory',['lodash',
    function (_) {

      
        function removeAt(s,i) {
            s = s.substring(0,i)+s.substring(i+1,s.length);
            return s;
        }

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
            }
            return y;
        };



        return {
            //direction degrees minutes
            ddm: {
                stringToDecimal: function (inputString) {
                    if(!inputString) return 0;

                    var s = inputString.replace(/\s/g, '');
                    s = s.replace('°','|').replace('\'','|');
                    var arr = s.split('|');
                    console.log('arg:0 ' + arr[0] + 'arg:1 ' + arr[1] + 'arg:2' + arr[2]);
                    return degreesminutesdirection(arr[0],arr[1],arr[2]);
                },
                toDecimal: function(degrees, minutes, direction) {
                    return degreesminutesdirection(degrees, minutes, direction);
                }
            }
        };
    }]
);
