var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('underscore');
mongoose.connect('mongodb://localhost/test');

var Movie = require('./models/movie.js');
var User = require('./models/user.js');

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('js'));
app.use(bodyParser.urlencoded({extent: false}));
app.listen(port);
app.locals.pretty = true;
app.locals.moment = require('moment');
console.log('imooc start on port', port);

app.get('/', function (req, res) {
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






