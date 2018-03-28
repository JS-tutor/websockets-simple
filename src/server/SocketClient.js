const EventEmitter = require('events')

const {EVENTS} = require('../const/const')

module.exports = class SocketClient extends EventEmitter {
	constructor(socket, io) {
		super()
		this.io = io
		this.socket = socket
		this.name = 'Chater' + Math.floor(Math.random()*90+10)
		socket.emit(EVENTS.SETUP_NAME, this.name)

		// add listeners
		socket.on('disconnect', this.disconnect.bind(this))
		socket.on(EVENTS.MESSAGE, this.message.bind(this))

		// notice other chaters
		socket.broadcast.emit(EVENTS.USER_ENTER, this.name)
	}

	disconnect() {
		console.log('[SocketClient DISCONNECT]', this.name)
		this.io.sockets.emit(EVENTS.USER_EXIT, this.name)
		this.emit('disconnect')
	}

	message(data) {
		console.log('[MESSAGE from %s]', this.name, data)
		this.io.sockets.emit(EVENTS.MESSAGE, {name: this.name, msg: data.msg})
	}
}