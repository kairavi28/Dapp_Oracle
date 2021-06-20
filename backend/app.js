var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var cors = require('cors');

var indexRouter = require('./routes/');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3001, () => {
  console.log('Listening on port: 3001');
});

module.exports = app;