module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection', function(socket) {
        console.log('new connection received', socket.id);


        socket.on('join_room', function(data) {
            console.log('joining request rec.', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        });



        socket.username = "Anonymous"
        socket.on('change_username', (data) => {
            socket.username = data.username
        })
        socket.on('new_message', (data) => {
            io.in(data.chatroom).emit('new_message', { message: data.message, username: socket.username });
        })
        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', { username: socket.username })
        })
    });
};