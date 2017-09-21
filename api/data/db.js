/**
 * Created by liuchang on 8/20/17.
 */
var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/mean2';
mongoose.Promise = global.Promise;
mongoose.connect(dburl, {useMongoClient: true});//{xxx} makes warning disappeared.

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to' + dburl);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error:' + err);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination(SIGINT)');
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination(SIGTERM)');
        process.exit(0);
    });
});

process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination(SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});

// bring in schemas and models
require('./hotels.model');
require('./users.model');