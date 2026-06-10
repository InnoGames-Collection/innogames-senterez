var nicknames = {};
var mongoose = require('mongoose');
var Mensajes = mongoose.model('mensajes');
var jwt = require("jsonwebtoken");
var User = mongoose.model('users');
var boardController = require('./board.server.controller');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var config = require('../config.js');
var socketUtil = require('./socket.util.js');

var syncNicknames = function (io) {
  var live = {};
  if (io && io.sockets && io.sockets.sockets) {
    Object.keys(io.sockets.sockets).forEach(function (sid) {
      var socket = io.sockets.sockets[sid];
      if (socket && socket.nickname && socket.nickname.nickname) {
        live[socket.nickname.nickname] = {
          nickname: socket.nickname.nickname,
          name: socket.nickname.name,
          image: socket.nickname.image,
          id: socket.nickname.id,
          socket: sid
        };
      }
    });
  }
  nicknames = live;
  return nicknames;
};

var UsersConnect = function (io) {
  if (!config.multicore) {
    return syncNicknames(io);
  }
  var usersCon = {};
  for (var i in io.sockets.sockets) {
    if (io.sockets.sockets[i].nickname) {
      usersCon[i] = io.sockets.sockets[i].nickname;
    }
  }
  return usersCon;
};

var getUserConnect = function (io, username) {
  syncNicknames(io);
  return nicknames[username] || false;
};

var disconnectUser = function (io, user) {
  if (!user || !user.nickname) {
    return;
  }
  try {
    if (nicknames[user.nickname]) {
      delete nicknames[user.nickname];
    }
  } catch (e) {
    // ignore
  }
};

exports.username = function (io, socket, dta, next) {
  var user = dta.user;
  if (dta.board) {
    socket.join(dta.board);
  }
  var _user = {
    nickname: user.username,
    name: user.name,
    image: user.image,
    id: user._id,
    socket: socket.id
  };
  nicknames[_user.nickname] = _user;
  socket.nickname = _user;
  nicknames = UsersConnect(io);
  io.sockets.emit('event', {
    event: 'users',
    data: {
      nicknames: nicknames
    }
  });
  next(null, nicknames);
};

exports.IsValidSocketToken = function (socket) {
  try {
    var tokenQuery = socket.request._query.token;
    if (!tokenQuery) {
      return false;
    }
    var bearer = tokenQuery.split(' ');
    var bearerToken = bearer.length > 1 ? bearer[1] : bearer[0];
    var payload = jwt.verify(bearerToken, config.jwtSecret);
    if (config.bindTokenToHost && payload.host && payload.host !== socket.handshake.address) {
      return false;
    }
    socket.auth = payload;
    return true;
  } catch (e) {
    return false;
  }
};

var validMensaje = function (string) {
  return string;
};

exports.mensaje = function (io, socket, dta, next) {
  if (dta.men.type === 'text') {
    dta.men.body = validMensaje(dta.men.body);
  }
  var data = {
    event: 'mensaje',
    data: {
      men: dta.men
    }
  };
  if (dta.men.public) {
    io.sockets.in(dta.men.recibe).emit('event', data);
  } else {
    socketUtil.emitToUser(io, nicknames, dta.men.recibe, data);
    socket.emit('event', data);
  }
  var newMEn = new Mensajes(dta.men);
  newMEn.save(function () {});
  addConverToUser(dta.men.recibe, dta.men.send);
  addConverToUser(dta.men.send, dta.men.recibe);
  next(null, {});
};

var loadConver = function (user1, user2, range, next) {
  Mensajes.find({$or: [{send: user1, recibe: user2}, {send: user2, recibe: user1}]})
    .sort({created: -1})
    .limit(range.limit)
    .skip(range.skip)
    .exec(function (err, mens) {
      next(err, mens);
    });
};

exports.loadUserConvert = function (io, socket, dta, next) {
  if (socket.nickname) {
    loadConver(socket.nickname.nickname, dta.user, dta.range, function (err, log) {
      next(err, log);
    });
  } else {
    next('not_authenticated');
  }
};

var userLog = function (user, next) {
  User.findOne({username: user.username}, function (e, o) {
    if (o && o.convAbiertas) {
      next(o.convAbiertas);
    } else {
      next([]);
    }
  });
};

var addConverToUser = function (user1, user2) {
  User.update(
    {username: user1},
    {$addToSet: {convAbiertas: user2}},
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
};

exports.removeConversation = function (io, socket, dta, next) {
  User.update(
    {username: dta.user},
    {$pull: {convAbiertas: dta.conver}},
    function (err) {
      if (err) {
        next(err);
      } else {
        next(null, 'ok');
      }
    }
  );
};

exports.disconnect = function (io, socket) {
  disconnectUser(io, socket.nickname);
  io.sockets.emit('event', {
    event: 'users',
    data: {
      nicknames: UsersConnect(io)
    }
  });
};

exports.getDataChat = function (io, socket, dta, next) {
  userLog(dta.user, function (logUser) {
    next(null, {
      users: UsersConnect(io),
      boards: socketUtil.boardsToArray(boardController.getBoards()),
      logUser: logUser || []
    });
  });
};

exports.getNicknames = function (io) {
  return UsersConnect(io);
};

exports.uploadFile = function (req, res) {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '../public/uploads');
  var curTime = new Date().getTime();
  form.on('file', function (field, file) {
    var fileName = curTime + '__' + file.name;
    fs.rename(file.path, path.join(form.uploadDir, fileName), function (err) {
      if (!err) {
        return res.send(fileName);
      }
    });
  });
  form.on('error', function (err) {
    console.log('Upload error:', err);
  });
  form.parse(req);
};

exports.deleteImage = function (req, res) {
  var parms = req.body;
  var dir = path.join(__dirname, '../public/uploads');
  fs.unlink(dir + '/' + parms.name, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send('ok');
  });
};
