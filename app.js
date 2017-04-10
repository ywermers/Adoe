var express=require('express');
var bodyParser=require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');
var logger=require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var Donation = require('./src/backend/models/donations');
var Foundation = require('./src/backend/models/foundation');
var Fundraiser = require('./src/backend/models/fundraiser');
var User = require('./src/backend/models/user');

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

//lisa
// app.use("/styles",express.static(__dirname + "/public"));
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, '/public')));
app.use("/public",express.static("public"));
app.use("/img",express.static("img"));





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
  console.log(process.env.MONGODB_URI)
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
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  Foundation.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},function (email, password, done) {
    var hash = hashPassword(password);
    console.log('LocaleStrategy email', email);
    console.log('password', password)
    // Find the user with the given email
    Foundation.findOne({email: email}, function (err, foundation) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {
        console.error(err);
        return done(err);
      }
      // if no user present, auth failed
      if (!foundation) {
        console.log(foundation);
        return done(null, false, {message: 'Incorrect Foundation Name.'});
      }
      // if passwords do not match, auth failed
      if (foundation.password !== password) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      // auth has has succeeded
      return done(null, foundation);
    });
  }
));

app.use('/', auth(passport));
app.use('/', userRoutes);
app.use('/', foundationRoutes )

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
