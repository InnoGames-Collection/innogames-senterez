function getSocketById (io, socketId) {
  if (!io || !socketId) {
    return null
  }
  if (io.sockets && io.sockets.connected && io.sockets.connected[socketId]) {
    return io.sockets.connected[socketId]
  }
  if (io.sockets && io.sockets.sockets && io.sockets.sockets[socketId]) {
    return io.sockets.sockets[socketId]
  }
  return null
}

function emitToUser (io, nicknames, username, payload) {
  var user = nicknames[username]
  if (!user || !user.socket) {
    return false
  }
  var socket = getSocketById(io, user.socket)
  if (!socket) {
    return false
  }
  socket.emit('event', payload)
  return true
}

function boardsToArray (boards) {
  var list = []
  if (!boards) {
    return list
  }
  Object.keys(boards).forEach(function (id) {
    list.push(boards[id])
  })
  return list
}

module.exports = {
  getSocketById: getSocketById,
  emitToUser: emitToUser,
  boardsToArray: boardsToArray
}
