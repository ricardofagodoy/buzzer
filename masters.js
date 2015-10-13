module.exports = function(socket, data, core) {
        
    var code = core.generateRoomCode();
        
    rooms[code] = {
                    users: [], 
                    state: '0'  // Ready state
                  };
    
    // Positive response informing code
    socket.emit('master', {code: code});
    
    socket.name = 'Master ' + code;
    socket.code = code;
    rooms[socket.code].users.push(socket);
        
    // Sends 'Ready!' to all (just master)
    core.broadcastButtonState(code);
        
    socket.on('press', function(data) {
        
        console.log(socket.name + ' pressed!');
        
        // If it's already 'Ready', does nothing
        if(rooms[socket.code].state == '0')
            return;
            
        // Makes it ready
        core.broadcastButtonState(socket.code, '0');
    });
        
    socket.on('closeRoom', function(data) {
        core.destroyRoom(code);
    });
        
    socket.on('disconnect', function(){
        core.destroyRoom(code);
    });
    
    // Let's see how's our rooms doing
    console.log(rooms);
};