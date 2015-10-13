module.exports = function(socket, data, core) {

    if(!data.code || !core.validateRoom(data.code)) {
        console.log('The code "' + data.code + '" is not valid!');
        socket.emit('user', {error: 1, msg: 'Invalid room code.'});
        return;
    }
        
    if(!data.name || !core.validateName(data.name, data.code)) {
        console.log('The name "' + data.name + '" is not valid!');
        socket.emit('user', {error: 1, msg: 'Name invalid or already taken.'});
        return;
    }
        
    socket.name = data.name;
    socket.code = data.code;
    
    rooms[socket.code].users.push(socket);
    
    // Positive response
    socket.emit('user', {error: 0});
    
    // Sends state to new user
    core.broadcastButtonState(socket.code);
        
    socket.on('press', function() {
        
        console.log(socket.name + ' pressed!');
        
        // If it's ready, congrats you got it!
        if(rooms[socket.code].state == '0')
            core.broadcastButtonState(socket.code, socket.name);
    });
 
    socket.on('disconnect', function() {
        
        console.log('User "'+ socket.name +'" disconnected.');
        
        var pos = rooms[socket.code].users.indexOf(socket);
        rooms[socket.code].users.splice(pos, 1);
        
        // Let's see who's left
        console.log(rooms[socket.code]);
    });  
};  