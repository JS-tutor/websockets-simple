/**
 * https://github.com/socketio/socket.io
 */

const io = require('socket.io').listen(3333)
const SocketClient = require('./SocketClient')

const clientsMap = new Map()

io.sockets.on('connection', socket => {
    let client = new SocketClient(socket, io)
    console.log('[CONNECTION]', socket.id, '=>', client.name)
    clientsMap.set(socket, client)
    client.on('disconnect', () => {
        console.log('[DISCONNECT]', socket.id)
        clientsMap.delete(socket)
    })
})
