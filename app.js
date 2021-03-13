var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var bodyParser=require('body-parser');

const session = require('express-session');
const flash = require('connect-flash');

var app = express();
app.use(session({
    secret:'mynicknameisbuzz',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
/* Routing to specific JS file */
var indexRouter = require('./routes/index');
var ticketsRouter = require('./routes/tickets');
var mapRouter = require('./routes/map');

ticketsRouter(app);
mapRouter(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* Controllers for javascript forms and database connection */
let authenticateController=require('./public/controllers/authenticate-controller');
let registerController=require('./public/controllers/register-controller');
let ticketsController=require('./public/controllers/tickets-controller');

/* route to handle login and registration */
/*
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/api/createTicket', ticketsController.createTicket);

app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.post('/controllers/tickets-controller', ticketsController.createTicket);
 */

module.exports = app;
