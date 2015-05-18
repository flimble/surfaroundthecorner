exports.id = 'second-test';

exports.up = function(done){
    var waves = this.db.collection('waves');
    console.log('did something');
    done();
};

exports.down = function(done){
    done();
};
