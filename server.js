// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

app.use(express.static(__dirname + '/public')); 
//redirect / to our index.html file

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) {  
	console.log('client connected');
	//when a new client connects
	io.clients(function(error, clients){
	  if (error) throw error;
		//send the list of clients out to all the clients
		io.emit('clientList', clients);
		console.log(clients);
	});
	
	//when the server receives clientClicked message, do this
	client.on('clientClicked', function(id) {
		//send a message to just the client whose button was clicked
		io.to(id).emit('youWereClicked');
	});
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 