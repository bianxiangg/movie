var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var _ = require('underscore');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/test');

mongoose.set('debug', true);
app.set('views', './app/views');
app.set('view engine', 'jade');
app.set('showStackError', true);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'imooc',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(express.static('js'));
app.use(bodyParser.urlencoded({extent: false}));
require('./config/route.js')(app);
app.locals.pretty = true;
app.locals.moment = require('moment');
app.listen(port);
console.log('imooc start on port', port);





