module.exports = function(app, express, io, config) {
    var controllers = require('../controllers');
    var mongoose = require('mongoose');
    var pkg = require('../package.json');

    var parseAllowedOrigins = function(origins) {
        if (!origins || origins === '*') {
            return '*';
        }
        return origins.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    };
    var allowedOrigins = parseAllowedOrigins(config && config.allowedOrigins);

    app.route('/health').get(function(req, res) {
        res.status(200).json({
            status: 'ok',
            service: 'senterez-api',
            time: new Date().toISOString()
        });
    });

    app.route('/api/status').get(function(req, res) {
        var dbState = mongoose.connection.readyState;
        res.status(200).json({
            status: dbState === 1 ? 'ok' : 'degraded',
            service: 'Senterez API',
            version: pkg.version || '1.0.0',
            mongodb: dbState === 1 ? 'connected' : 'disconnected'
        });
    });

    app.route('/').get(function(req, res) {
        res.status(200).json({
            service: 'Senterez API',
            status: 'running',
            health: '/health',
            apiStatus: '/api/status',
            docs: 'Frontend is served separately; point API_URL to this host.'
        });
    });

    app.all('*', function(req, res, next) {
        var origin = req.headers.origin;
        if (allowedOrigins === '*') {
            res.header('Access-Control-Allow-Origin', origin || '*');
        } else if (origin && allowedOrigins.indexOf(origin) !== -1) {
            res.header('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        res.header('Access-Control-Allow-Credentials', 'true');
        if ('OPTIONS' === req.method) {
            return res.sendStatus(200);
        }
        return next();
    });
    var fs = require('fs')
    var walk = function(path) {
        fs.readdirSync(path).forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    if (file != 'index.js') {
                        require(newPath)(app, express, controllers);
                    }
                }
            } else if (stat.isDirectory()) {
                // walk(newPath);
            }
        });
    };
    var models_path = __dirname;
    walk(models_path);
    io.use(function(socket, next) {
        if (!io.nicknames){
            io.nicknames = {}
        }
        if (controllers.chat.IsValidSocketToken(socket)) {
            next();
        } else {
            next(new Error("not authorized"));
        }
    });
    // socket events
    io.on('connection', function (socket) {
        var headers = socket.handshake.headers;
        //console.log(headers);
        socket.on('event', function(data, fn) {
            controllers[data.c][data.f](io,socket,data.data,fn);
        });
        socket.on('disconnect', function () {
            var data={
                c:'chat',
                f:'disconnect'
            }
            controllers[data.c][data.f](io,socket);
        });
    });
};