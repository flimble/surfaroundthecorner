exports.id = 'correct-lat-lng-for-sydneynorth';

exports.up = function (done) {
    var waves = this.db.collection('waves');
    waves.update({Name: 'Fishermans Bay'}, {"$set": {"Latitude": -33.7364098, "Longitude" : 151.3110267}});
    done();
};

exports.down = function (done) {
    done();
};
