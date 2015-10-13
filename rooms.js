rooms = {};   // global objects to store all rooms and users

var readyText = 'Ready to push!',
    roomClosing = 'Master closed this room!';

module.exports = {
   
    destroyRoom: function(code) {
        
        console.log('Disconnecting users from room ' + code + '...');
        this.broadcastToRoom(code, 'closeRoom', roomClosing);
        
        console.log('Destroying room '+ code + '...');
        delete rooms[code];
        
        console.log(rooms);
    },
    
    broadcastToRoom: function(code, event, data) {

        if(!code || !rooms[code])
            return;

        for(var i = 0; i < rooms[code].users.length; i++)
            rooms[code].users[i].emit(event, data);  
    },

    broadcastButtonState: function(code, value) {

        if(!code || !rooms[code])
            return;

        if(value != undefined)
            rooms[code].state = value;

        this.broadcastToRoom(code, 'press', 
            rooms[code].state == '0' ? readyText : rooms[code].state);
    },

    generateRoomCode: function() {

        var code = 0;

        do {
            code = Math.floor((Math.random() * 1000) + 1);
        } while(rooms[code]);

        return code;
    },

    validateRoom: function(code) {
        return rooms[code];
    },

    validateName: function(name, code) {
        if (name == '0')
            return false;
        
        for(var i = 0; i < rooms[code].users.length; i++)
            if(rooms[code].users[i].name == name)
                return false;

        return true;
    }
};