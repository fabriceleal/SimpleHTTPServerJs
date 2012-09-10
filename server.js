#!/usr/local/bin/node

var http = require('http');

var server = http.createServer(function(req, res){
	console.log(req);
});

server.listen(1234, '127.0.0.1');
