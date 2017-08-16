const express = require('express');
const route = require('./route/index');
var server = express();

server.listen(8080);

server.use(function (req, res) {
    console.log(req.method, req.url);
})
//route


server.use('/home', route);

