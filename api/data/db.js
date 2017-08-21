/**
 * Created by liuchang on 8/20/17.
 */
var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/mean2';

mongoose.connect(dburl, {useMongoClient: true});
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to' + dburl);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error:' + err);
});
