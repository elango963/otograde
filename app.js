const express = require('express'),
    expressValidator = require('express-validator'),
    router = express.Router(),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    middleware = require('./middleware')(),
    index = require('./routes/index'),
    lead = require('./routes/lead'),
    flash = require('connect-flash'),
    ajax = require('./routes/ajax')(),
    session = require('express-session');

require('express-group-routes');

const app = express(),
    env = process.env.NODE_ENV;

const envConfig = require('dotenv').config();
for (var parsedJson in envConfig.parsed) {
    var apiUrl = envConfig.parsed[parsedJson];
    if (apiUrl.indexOf("API_DOMAIN") !== -1) {
        process.env[parsedJson] = apiUrl.replace("{API_DOMAIN}", process.env.API_DOMAIN);
    }
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(flash());

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: process.env.SESSION_SECRET,
                  resave: false, 
                  saveUninitialized: false}));
app.use((req, res, next) => {
    res.locals.flashMessage = req.flash('flashMessage');
    next();
});
app.use('/', index);
app.use('/lead', lead);
console.log("coming here");
app.post('/ajax/leadcreate',
    middleware.verifyAjaxRequest,
    ajax.leadCreation
);
app.get('/ajax/lead/edit/:id',
    middleware.verifyAjaxRequest,
    ajax.leadEditPage
);
app.post('/ajax/imageUpload',
    middleware.verifyAjaxRequest,
    ajax.imageUpload
);
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
