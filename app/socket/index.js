var ioEvents = function(io) {

    io.on('connection', function(socket){
        console.log('!!!!!!!!!!!!!!!!');
        socket.on('chat message', function(msg) {
            io.emit('chat message', msg);
           // io.broadcast.emit('chat message', msg);
        });
    });
    
}

//инициализация socket.io 
var init = function(app) {

    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    //надо для безопасности https://socket.io/docs/client-api/#io
    io.set('transports', ['websocket']);

      ioEvents(io);

    return http;
}

module.exports = init;