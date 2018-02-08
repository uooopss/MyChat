'use strict';

var Room = require('../models/room');

var ioEvents = function(io) {
    


    // io.of('/room').on('connection', function(socket){
    //     socket.emit('news', {hello: 'world'});
    //     socket.on('my', function(data) {
    //         console.log(data);
    //     })
    //     socket.on('createRoom', function(title) {
    //         console.log('!!!!!!!!!!!!!!!!');

    //         Room.findOne({'title': title}, function(err, room) {
    //             if(err) return err;
    //             if(room) {
    //                 socket.emit('updateRoomsList', { error: 'Room title already exists.' });
    //             }else {
    //                 Room.create({'title': title}, function(err, newRoom) {
    //                     if(err) return err;
    //                     if(newRoom) {
    //                         socket.emit('updateRoomsList', newRoom);
    //                         socket.broadcast.emit('updateRoomsList');
    //                     }
    //                 });
    //             }
    //         });
    //     });    
    // });
    
}

//инициализация socket.io 
var init = function(app) {

    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    //надо для безопасности https://socket.io/docs/client-api/#io
    //io.set('transports', ['websocket']);

    // io.use((socket, next) => {
    //     require('../session')(socket.request, {}, next);
    // });

      //ioEvents(io);
      io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my', function (data) {
          console.log(data);
        });
      });


    return http;
}

module.exports = init;