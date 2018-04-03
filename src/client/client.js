const {EVENTS} = require('../const/const')

window.onload = function () {
    let app = document.getElementById('app')
    app.innerHTML = ''

    let textInput = document.getElementById('textInput')
    let sendButton = document.getElementById('sendButton')
    sendButton.addEventListener('click', e => {
        if(!socket.connected) return
        let s = textInput.value.trim()
        if(!s) return
        socket.emit(EVENTS.MESSAGE, {msg: s})
        textInput.value = ''
    })

    let disconnectButton = document.getElementById('disconnectButton')
    disconnectButton.addEventListener('click', e => socket.disconnect())

    function addLog(s) {
        let div = document.createElement('div')
        div.innerHTML = '<i>' + new Date().toLocaleTimeString() + '</i> LOG: <code>' + s + '</code>'
        app.appendChild(div)
    }

    function addMsg(s) {
        let div = document.createElement('div')
        div.innerHTML = '<i>' + new Date().toLocaleTimeString() + '</i> MSG: <span>' + s + '</span>'
        app.appendChild(div)
    }

    let socket = io.connect('http://localhost:3333')
    socket.on('connect', () => {
        socket.on(EVENTS.SETUP_NAME, name => addLog('My name is ' + name))
        socket.on(EVENTS.USER_ENTER, name => addLog(name + ' entered'))
        socket.on(EVENTS.USER_EXIT, name => addLog(name + ' exited'))
        socket.on(EVENTS.MESSAGE, data => addMsg(data.name + ': ' + data.msg))
    })

    socket.on('disconnect', () => addLog('disconnected from server'))
}