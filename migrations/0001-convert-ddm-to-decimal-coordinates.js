var _ = require('lodash');

exports.id = 'convert-ddm-to-decimal-coordinates';


function removeAt(s, i) {
    s = s.substring(0, i) + s.substring(i + 1, s.length);
    return s;
}

function roundnum(x, p) {
    var i;
    var n = parseFloat(x);
    var m = n.toPrecision(p + 1);
    var y = String(m);
    i = y.indexOf('e');
    if (i === -1)    i = y.length;
    var j = y.indexOf('.');
    if (i > j && j !== -1) {
        while (i > 0) {
            if (y.charAt(--i) === '0')
                y = removeAt(y, i);
            else
                break;
        }
        if (y.charAt(i) === '.')
            y = removeAt(y, i);
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


var stringToDecimal = function (inputString) {
    if (!inputString) return 0;

    //console.log(inputString);
    var arr = inputString.trim().split(' ');


    arr.forEach(function (e) {
        e = e.replace(/\element/g, '');
    });

    var degrees = arr[0].replace('°', '');
    var minutes = arr[1].replace('\'', '');
    var direction = arr[2];

    //console.log('degrees: ' + degrees + ' minutes: ' + minutes + ' direction: ' + direction);
    return degreesminutesdirection(degrees, minutes, direction);
};


exports.up = function (done) {
    var waves = this.db.collection('waves');

    waves.find({Latitude: {$exists: true}}).forEach(function (element) {

        var latitude = element.Latitude;
        if (latitude && latitude.indexOf(' ') > -1) {
            console.log(element._id);
            var result = waves.update(
                {_id: element._id},
                {"$set": {"Latitude": stringToDecimal(latitude)}}
            );
        }

        var longitude = element.Longitude;
        if (longitude && longitude.indexOf(' ') > -1) {
            waves.update(
                {_id: element._id},
                {"$set": {"Longitude": stringToDecimal(longitude)}}
            );
        }
    });
    done();
};

exports.down = function (done) {
    done();
};
