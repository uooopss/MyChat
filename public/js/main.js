'use strict';

var app = { 
  rooms: function(){
  var socket = io.connect('/rooms', { transports: ['websocket']});

    // socket.on('connect', function() {

      socket.on('news', function(data) {
        console.log(data);
      })
      socket.emit('n', {my: 'NAMe'});

      socket.on('updataRommsList', function(room) {
        if(room.error != null) {
          console.log(room.error);
        }else {
          var html = '<a href="#"><li class="room-item">' + room.title + '</li></a>';
          if($(".room-list ul li").length > 0){
            $('.room-list ul').prepend(html);
          }else{
            $('.room-list ul').html('').html(html);
          }
        }
      })

      $('.room-create button').on('click', function(e) {
        alert('qwerty1');
        var roomTitle = $('input[name="title"]').val().trim();
        if(roomTitle !== '') {
          socket.emit('createRoom', roomTitle);
        }
      })
    // })
  }
};

