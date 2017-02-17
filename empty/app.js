const express = require('express');
const path = require('path');


const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const socketIo = require('socket.io');
const http = require('http');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'rainbowsheep.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('jumped', function (data) {
    console.log("Message received on server", data);
    io.emit( 'jumped', {message: "other computer jumped"})
  });
});

module.exports = httpServer;
