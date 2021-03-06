var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var _ = require('underscore');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/test');

var Movie = require('./models/movie.js');
var User = require('./models/user.js');

app.set('views', './views');
app.set('view engine', 'jade');
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
app.listen(port);
app.locals.pretty = true;
app.locals.moment = require('moment');
console.log('imooc start on port', port);

app.get('/', function (req, res) {
    console.log('already have session: ', req.session.user);
    Movie.fetch(function (err, docs) {
        res.render('pages/index', {
            title: 'imooc 首页',
            movies: docs
        });
    });
});

app.get('/detail/:id', function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, docs) {
        if (err) {
            console.log('has error: ', err);
        }
        res.render('pages/detail', {
            title: 'imooc 详情页',
            movie: docs
        });
    });
});

app.get('/admin/movie', function (req, res) {
    res.render('pages/admin', {
        title: 'imooc 后台录入页',
        movie: {}
    });
});

app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, docs) {
        res.render('pages/list', {
            title: 'imooc 首页',
            movies: docs
        });
    });
});

app.get('testh', function (req, res) {
    res.render('pages/list.html');
});

app.post('/admin/movie/new', function (req, res) {
    console.log(req.body);
    newMovie = req.body.movie;
    var movie = new Movie();
    movie = _.extend(movie, newMovie);
    movie.save(function (err, doc) {
        res.redirect('/detail/' + doc._id);
    });
});

app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    console.log(id);
    console.log(id !== undefined);
    if (id !== undefined){
        console.log('before remove');
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            }

            res.json({
                "success": 1
            });
        });
        console.log('after remove');

    }
});

app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('pages/admin', {
                title: '更新电影数据',
                movie: movie
            });
        });
    }
}); 


/**
 * 用户注册
 */
app.post('/user/signup', function(req, res) {
    var _user = req.body.user;
    var user = new User(_user);
    User.findById(user.id, function(err, userOld) {
        if (err) {
            console.log(err);
        }
        if (userOld) {
           return res.redirect('/user/list');
        }
        user.save(function(err, user) {
            if (err) {
                console.log(err);
            }
            res.redirect('/user/list');
        });
    });
});

/**
 * 用户列表展示
 */
app.get('/user/list', function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err);
        }
        res.render('pages/userlist', {
            users: users 
            });
    });
});


/**
 * 登陆验证
 */
app.post('/user/signin', function(req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name: name}, function(err, user) {
        if (err) {
            console.log('登陆过程中查找用户出错，', err);
        }
        if (!user) {
            return res.redirect('/');
        }

        var isMatch = user.validateUser(password);
        console.log(isMatch);
        if (isMatch) {
            console.log(user.name, '登陆了');
            req.session.user = user;
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});





