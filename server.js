// require('./api/data/dbconnection.js').open();
require('./api/data/db.js');
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let routes = require('./api/routes/index');

let app = express();
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