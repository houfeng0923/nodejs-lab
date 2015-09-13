/*
 * Module dependencies.
 */
var http = require("http");
var path = require("path");
var fs = require("fs");
var express = require("express");
var config = require("./config");
var _ = require("lodash");  //  similar to underscore

// express 4.x middlewares
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
// var csrf = require('csurf');
// var device = require('express-device');

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

// express logger
logger
.token('remote-addr', function(req) {
    return req.headers['x-real-ip'] || (req.socket && req.socket.remoteAddress);
})
.token('date', function() {
    return new Date().toString();
});

mongoose.connect(config.mongo.uri);
autoIncrement.initialize(mongoose.connection);

// if (config.seedDB) {
//     require('./__MOCKS__/seed.js');
// }

var app = global.app = express();
var server = http.createServer(app);
// var io = global.io = require('socket.io')(server);
var routes = require('./routes');



// views setting

// app.locals.pretty = false;
// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (config.viewCache) {
    app.enable("view cache");
} else {
    app.disable("view cache");
}



// pipeline
app
.use(logger('dev'))
.use(express.static(config.publicDir))
.use(bodyParser())
.use(cookieParser(config.cookieSecret))
.use(session())
.use(methodOverride())

//.use(device.capture())
//detect device
//device.enableDeviceHelpers(app);


// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

// routes

var routes = require('./routes/index');
var home = require('./routes/home');

app.use('/home', home);
app.use('/', routes); // global router 、500 、 404 etc.


// or 404
/// catch 404 and forwarding to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

/// error handlers
app.use(function(err, req, res, next) {
    console.log(err.stack);
    // res.json(err);
    res.status(err.status || 500);
    res.render('50x', {
        title: '错误',
        error: err
    });
    console.error("[%s][%s] Express handle exception: [%s]", new Date(), process.pid, err);
});



// exports

app.set('port', config.port || 3000);
module.exports = app;
// or
/*module.exports = (function() {
    // init server
    server.listen(config.port, function() {
        console.log('[%s] app start : %s', new Date(), config.port);
    });
    return server;
})();
*/