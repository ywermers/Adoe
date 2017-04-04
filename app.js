var express=require('express');
var bodyParser=require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');
var logger=require('morgan');
var routes = require('./src/backend/routes/index');
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

app.use('/', routes);


var mongoose = require('mongoose');
mongoose.connect(connect);
mongoose.connection.on('connected', function(){
  console.log('mongoose connection successful');
})
mongoose.connection.on('error', function(){
  console.log('mongoose connection NOT successful');
})

var port = process.env.PORT || 3001;
console.log('listening on port ' + port)
app.listen(port);

module.exports = app
