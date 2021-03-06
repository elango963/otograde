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
    session = require('express-session'),
    users = require('./routes/users'),
    FileStore = require('session-file-store')(session);
    dotenvExpand = require('dotenv-expand');

require('express-group-routes');
const app = express(),
    env = process.env.NODE_ENV;

const envConfig = require('dotenv').config();
dotenvExpand(envConfig);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new FileStore({}),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.ENV === "production" }
}));
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
app.use('/', users);
app.use('/', index);
app.use('/lead', lead);

app.group('/ajax', router => {
  router.post('/leadcreate',
      middleware.verifyAjaxRequest,
      ajax.leadCreation
  );
  router.get('/lead/edit/:id',
      middleware.verifyAjaxRequest,
      ajax.leadEditPage
  );
  router.post('/imageUpload',
      middleware.verifyAjaxRequest,
      ajax.imageUpload
  );

  router.post('/saveAnswers',
      middleware.verifyAjaxRequest,
      ajax.saveAnswers
  );
  
  router.post('/saveAllAnswers',
      middleware.verifyAjaxRequest,
      ajax.saveAllAnswers
  );

  router.post('/get/report/:tabname',
      middleware.verifyAjaxRequest,
      ajax.getReportTabData
  );
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  /*res.status(200).render('error', {
        message: err.message,
        error: err
    }, (err, html) => {
      res.send(html);
  });*/
  return;
});

// logging unhandled promise rejection
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

module.exports = app;
