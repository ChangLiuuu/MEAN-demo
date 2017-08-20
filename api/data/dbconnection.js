/**
 * Created by liuchang on 8/18/17.
 */
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/mean2';

var _connection = null;

var open = function() {

    MongoClient.connect(dburl, function(err, db) {

        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = db;

    });

    // set _connection
};

var get = function() {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};