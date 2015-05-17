var mongodb = require('mongodb');

exports.up = function(db, next){
    var pets = mongodb.Collection(db, 'waves');
    console.log('did something');
    next();
};

exports.down = function(db, next){
    next();
};
