// require('./api/data/dbconnection.js').open();
require('./api/data/db.js');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes/index');

var app = express();
app.set('port', 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// enable parsing of posted forms
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/api', routes);

var server = app.listen(app.get('port'), (req, res) => {
    var port = server.address().port;
    console.log('Here is port ' + port);
});