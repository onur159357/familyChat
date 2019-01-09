const socketio = require('socket.io');
const io = socketio();

const socketApi = {
    io,
}

io.in('connection', socket => {
    console.log('user giriş yaptı');
})

module.exports = socketApi;