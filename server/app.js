var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var secrets = require('./secrets');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var categories = require('./routes/categories');
var components = require('./routes/components');
var User = require('./models/User')
var port = process.env.PORT || '3000';
var http = require('http');

mongoose.connect(config.db.mongodb);

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: secrets.session.secret,
  saveUninitialized: false, // don't create session until something stored
  resave: false //don't save session if unmodified
}));

passport.use(new GoogleStrategy({
    clientID: secrets.google.clientID,
    clientSecret: secrets.google.clientSecret,
    callbackURL: secrets.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var userProfile = { displayName: profile.displayName };

    if (profile.emails && profile.emails.length > 0) {
      userProfile.email = profile.emails[0].value;

      // TODO: require a string helper lib
      if (userProfile.email.indexOf('@theappbusiness.com', userProfile.email.length - '@theappbusiness.com'.length) < 1) {
        return done(null, false, { message: 'Only TAB users are permitted for now' })
      }
    } else {
      return done(null, false, { message: 'Failed to determine users email address' });
    }

    if (profile.photos && profile.photos.length > 0) {
      userProfile.photo = profile.photos[0].value;
    }

    User.findOrCreate({ googleId: profile.id }, userProfile, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user.googleId); //this is the 'user' property saved in req.session.passport.user
});

passport.deserializeUser(function (id, done) {
  return User.findOne({ googleId: id }, function (error, user) {
    return done(error, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../build')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// app.use('/categories', ensureAuthenticated, categories);
app.use('/categories', ensureAuthenticated, categories);
app.use('/components', ensureAuthenticated, components);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Serve index.html for all routes to leave routing up to react-router
app.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'build' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

app.set('port', port);

var server = http.createServer(app);

server.listen(port);

console.log('Running the server on ' + port);

module.exports = app;
