var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('underscore');
mongoose.connect('mongodb://localhost/test');

var Movie = require('./models/movie.js');

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
        movies: [
            {
                _id: 1,
                title: '泰坦尼克号'
            }
        ],
        movie: {
            name: '真是的谎言',
            language: '英语',
            country: '美国',
            year: 1998,
            summary: '战斗场面火爆'
        }
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
        res.render('pages/detail', {
            title: '新的电影',
            movie: doc
        });
    });
});






