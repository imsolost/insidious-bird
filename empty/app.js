var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var socketIo = require('socket.io');
var http = require('http');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var httpServer = http.Server(app);
var io = socketIo(httpServer);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use("/socket.io", express.static(path.join(__dirname, './node_modules/socket.io-client/dist')));
// app.use('/game', express.static(path.join(__dirname, 'phaser')))

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  // socket.on('ping', function (data) {
  //   console.log("received ping", data.a);
  //   socket.emit('pong', { frog: 45 })
  // });
  socket.on('jumped', function (data) {
    console.log("Message received on server", data);
    io.emit( 'jumped', {message: "other computer jumped"})
  });
});

module.exports = httpServer;
