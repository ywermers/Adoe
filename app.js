var express=require('express');
var bodyParser=require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');
var logger=require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var userRoutes = require('./src/backend/routes/user');
var foundationRoutes = require('./src/backend/routes/foundations');
var auth = require('./src/backend/routes/auth');
var hashPassword = require('./src/backend/hashPassword');

var connect = process.env.MONGODB_URI
var app = express();

// view engine setup
app.engine('.hbs',exphbs({ extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect(connect);
mongoose.connection.on('connected', function(){
  console.log('mongoose connection successful');
})
mongoose.connection.on('error', function(){
  console.log('mongoose connection NOT successful');
})
mongoose.Promise = global.Promise;
var port = process.env.PORT || 3001;
console.log('listening on port ' + port)
app.listen(port);

app.use(session({
  secret: process.env.SECRET,
  cookie: {
    // In milliseconds, i.e., 10 days
    maxAge: 1000 * 60 * 60 * 24 * 10
  },
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(model, done) {
  done(null, model._id);
});

passport.deserializeUser(function(id, done) {
  models.Foundation.findById(id, function(err, foundation) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(function (username, password, done) {
    var hash = hashPassword(password);

    // Find the user with the given username
    models.Foundation.findOne({foundation: foundation}, function (err, foundation) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {
        console.error(err);
        return done(err);
      }
      // if no user present, auth failed
      if (!user) {
        console.log(foundation);
        return done(null, false, {message: 'Incorrect Foundation Name.'});
      }
      // if passwords do not match, auth failed
      if (foundation.password !== hash) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      // auth has has succeeded
      return done(null, user);
    });
  }
));

app.use('/', auth(passport));
app.use('/api/users', userRoutes);
app.use('/api/foundations', foundationRoutes )

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

module.exports = app
