import Storage from './lstorage'
import SocketIO from 'socket.io-client'

var socket = null

function connect () {
  var dirServer = Storage.get('serverDir')
  var token = Storage.get('token')
  if (!dirServer || !token) {
    return null
  }
  if (socket) {
    socket.disconnect()
    socket = null
  }
  socket = SocketIO.connect(dirServer, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 20,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 10000,
    timeout: 20000,
    query: 'token=Bearer ' + encodeURIComponent(token)
  })
  return socket
}

function getSocket () {
  if (socket && socket.connected) {
    return socket
  }
  if (socket && !socket.connected) {
    return socket
  }
  return connect()
}

function disconnect () {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export default {
  connect,
  getSocket,
  disconnect
}
