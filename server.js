#!/usr/local/bin/node

var PORT = 1234;
var ADDRESS = '127.0.0.1';


var path = require('path');
var http = require('http');
var fs = require('fs');
var url = require('url');

var mappings = {
	'.html' : 'text/html',
	'.js'   : 'text/javascript'
};

var server = http.createServer();

server.on('request', function(request, response){
	console.log('* Server.Request');

	request.on('data', function(chunk){

	});
	request.on('end', function(){

	});
	request.on('close', function(){

	});

	console.log('** request.method: ' + request.method);
	var parsed = url.parse(request.url);
	console.log('** request.url: ' + request.url, parsed);

	// Is this dangerous because of '..' ???
	var normalized = '.' + parsed.pathname;
	console.log('** normalized: ' + normalized);

	var resourceType = mappings[path.extname(normalized)];
	console.log('** resourceType: ' + resourceType);

	if(resourceType) {

		fs.readFile(normalized, function(err, data){
			if(err) {
				console.log('*** Some error serving url "' + request.url + '", 404!');
				console.log(err);

				response.writeHead(404);
				response.end();
			} else {
				console.log('*** Serving url "' + request.url + '"');
				response.writeHead(200, {
					  'Content-Length': data.length,
					  'Content-Type': resourceType
				});
				response.write(data);
				response.end();
			}
		});

	} else {
		console.log('*** This file extension is not served, 404!');
		// This file is not served!
		response.writeHead(404);
		response.end();
	}


});

server.on('connection', function(socket){
	console.log('* Server.Connection');
});

server.on('close', function(){
	console.log('* Server.Close');
});

server.on('checkContinue', function(request, response){
	console.log('* Server.CheckContinue');
});

server.on('connect', function(request, socket, head){
	console.log('* Server.Connect');
});

server.on('upgrade', function(request, socket, head){
	console.log('* Server.Upgrade');
});

server.on('clientError', function(exception){
	console.log('* Server.ClientError');
});

server.listen(PORT, ADDRESS);

