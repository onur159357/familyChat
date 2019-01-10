const socketio = require('socket.io');
const io = socketio();

const socketApi = {
    io,
}
/**
 * Redis adapter
 */
const redisAdepter = require('socket.io-redis');
io.adapter(
    redisAdepter({ 
        host: process.env.REDIS_URI, 
        port: process.env.REDIS_PORT 
    })
);

io.in('connection', socket => {
    console.log('user giriş yaptı');
})

module.exports = socketApi;