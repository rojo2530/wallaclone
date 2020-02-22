"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); //Se hace esto apra usar ficheros con extension html en vez de ejs, y asi vscode nos de ayuda de html
app.engine('html', require('ejs').__express);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/**
 * Conexion a la base de datos
 */
const mongooseConnection = require('./lib/connectMongoose');
require('./models/Anuncio');

/**
 * Rutas para la API
 */
app.use('/apiv1/usuario', require('./routes/apiv1/user'));
app.use('/apiv1/login', require('./routes/apiv1/login'));
app.use('/apiv1/register', require('./routes/apiv1/register'));
app.get('/apiv1/checkToken', require('./lib/jwtAuth'), function(req, res) {
  const user = {
    _id: req._id,
    nickname: req.nickname,
    email: req.email,
  }
  res.json({ sucesss: true, result: user });
});
app.get('/apiv1/logout', require('./lib/jwtAuth'), function(req, res) {
  res.clearCookie('token');
  return res.sendStatus(200);
});
app.use('/apiv1/tags', require('./routes/apiv1/tags'));
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
//Cualquier llamada a la api, excepto el login tiene que tener un token valido
app.use('/apiv1/*', require('./lib/jwtAuth'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // comprobar error de validación que hemos hecho con el middleware express-validator
  if (err.array) { //error de validacion
    err.status = 422;
    const errInfo = err.array({onlyFirstError: true})[0]; //Sacamos la propiedad cero.
    err.message = isApi(req) ? 
        { message: 'Not valid', errors: err.mapped()}:
        `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }
  res.status(err.status || 500);


  if (isApi(req)) {
    res.json({ sucesss: false, error: err.message});
    return;   
  }
     // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isApi(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
