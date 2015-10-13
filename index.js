var http = require('http'),
    serveHtml = require('./serveHtml'),
    rooms = require('./rooms'),
    users = require('./users'),
    masters = require('./masters');
    
// Basic HTTP to serve static files manually
var server = http.createServer(function(req, res) {
    
    var header = {'Content-Type': 'text/html'},
        data = serveHtml(req.url, header);
        
    res.writeHead(200, header);
    res.end(data);
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
    
    console.log('People connected: ' + io.sockets.sockets.length);
    
    socket.on('user', function(data) {    
        users(socket, data, rooms);
    });
              
    socket.on('master', function(data) {
        masters(socket, data, rooms);
    }); 
    
    socket.on('disconnect', function() {
        console.log('People connected: ' + io.sockets.sockets.length);
    });
});

server.listen(5000);