var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var session=require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Login Work Start
app.use(session({secret:'secret-code',cookie:{maxAge:6000}}));
var checkUser=function(req,res,next){
  if(req.session.loggedIn){
    next();
  }else{
    var admin="admin", password="admin";
    if(req.body.username===admin && req.body.password===password){
      req.session.loggedIn=true;
      res.redirect('/');
    }else{
      res.render('login',{title:"Login Here"});
    }
  }
};
var logout=function(req,res,next){
  req.session.loggedIn=false;
  res.redirect('/');
};
app.use('/',checkUser, index);
//  Login Work Start End
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

module.exports = app;