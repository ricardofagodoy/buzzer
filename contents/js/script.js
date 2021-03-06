var socket;

$(function() {
    
    var internalError = 'Fuck it! Internal Error.',
        thankYouMessage = 'Thanks for using Buzzer!';
    
    // User flow
    $('#enterRoom').click(function() {

        var code = $('#code').val(),
            name = $('#name').val();
        
        if(!code || !name) {
            showUserErrorMsg('Fill both fields bellow!');
            return;
        }
        
        socket = io();
        
        // Attempt to new user
        socket.emit('user', {code: code, name: name});
        
        socket.on('user', function(data) {
            
            // Success user!
            if(data && !data.error) {
                
                $('#index').hide();
                $('#userSection').show();
                
                addSocketListeners(socket);
                return;
            }
            
            showUserErrorMsg((data && data.msg) ? data.msg : internalError);
        });
    });
    
    // Master flow
    $('#newRoom').click(function() {
        
        socket = io();
        
        // Attempt to create new room
        socket.emit('master');
        
        socket.on('master', function(data) {
            
            // If get a code back
            if(data && data.code) {
                
                $('#index').hide();
                $('#masterSection').show();
                
                $('#codeLabel').html('Code: ' + data.code);
                addSocketListeners(socket);
                
                $('#closeRoom').click(function() {
                    
                    // To destroy the room friendly
                    socket.emit('closeRoom');
     
                    socket.disconnect();
                    alert(thankYouMessage); 
                    
                    window.location.replace("/");
                });
                
                return;
            } 
                
            showUserErrorMsg(internalError);
        });
    });

    // Util functions
    function addSocketListeners(socket) {
        
        $('#buzz').click(function() {
            socket.emit('press');
        });
        
        $('#buzzMaster').click(function() {
            socket.emit('press');
        });
    
        socket.on('press', function(data) {
            $('#buzzText').html(data);
            $('#buzzTextMaster').html(data);
        });
        
        socket.on('closeRoom', function(data) {
                    
            socket.disconnect(); 
            alert(data);
            
            window.location.replace("/");
        });
    }
    
    function showUserErrorMsg(errorMsg) {
        $('#userError').html(errorMsg);
        $('#userError').show("fast");
    }
});