/**
 * Created by liuchang on 8/18/17.
 */
let MongoClient = require('mongodb').MongoClient;
let dburl = 'mongodb://localhost:27017/mean2';

let _connection = null;

let open = function() {

    MongoClient.connect(dburl, function(err, db) {

        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = db;

    });

    // set _connection
};

let get = function() {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};