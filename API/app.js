var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const core=require('cors')
const dotenv=require('dotenv')
var indexRouter = require('./routes/user');
var usersRouter = require('./routes/admin');
const mongoose=require('mongoose')
var app = express();
dotenv.config()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect(process.env.MDB_CONNECT,{
  useNewUrlParser:true
},(err)=>{
  
  if(err) return console.error(err)
  console.log("connected to mongodb")
})

app.use(core({
  origin:['http://localhost:3000'],
  credentials:true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/admin', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
