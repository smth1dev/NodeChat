module.exports.handler = function (io){

var onlineUsers = [];
var clients = [];
var chatrooms = ['general','dev','fun'];

io.on('connection', function(socket){
 
  onlineUsers.push(socket.handshake.session.username);
  // broadcast online users
  if(onlineUsers.length > 0)
  io.emit('onlineUsers',onlineUsers);

  io.emit('availableChatrooms',chatrooms);
  // store the room name in the socket session for this client
  socket.room = 'general';
  // send client to room 1
  socket.join('general');


//user disconnect  
      socket.on('disconnect', function(){
        console.log('user disconnected' + JSON.stringify(chatrooms));

        //remove user from online users list
        var index = onlineUsers.indexOf(socket.handshake.session.username);
      	if (index > -1) {
        	onlineUsers.splice(index, 1);
    	   }
    	  socket.leave(socket.room);
        io.emit('onlineUsers',onlineUsers);
      });
//user message
      socket.on('chat message', function(packet){
            io.sockets.in(socket.room).emit('chat message', socket.handshake.session.username+" : "+packet.message);
        }
      );
//change chat room 
      socket.on('changeChatroom', function(newroom){
        // leave the current room (stored in session)
        socket.leave(socket.room);
        // join new room, received as function parameter
        socket.join(newroom);
        // update socket session room title
        socket.room = newroom;

      });


});

}
