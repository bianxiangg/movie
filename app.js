var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);
app.locals.pretty = true;
console.log('imooc start on port', port);

app.get('/', function (req, res) {
    res.render('pages/index', {
        title: 'imooc 首页',
        movies: [
            {
                _id:1,
                title:'泰坦尼克号'
            }
        ]
    });
});

app.get('/detail/:id', function (req, res) {
    res.render('pages/detail', {
        title: 'imooc 详情页',
        movies: [
            {
                _id:1,
                title:'泰坦尼克号'
            }
        ],
        movie: {
            flash: 'c:/dd.lv'
        }
    });
});

app.get('/admin/movie', function (req, res) {
    res.render('pages/admin', {
        title: 'imooc 后台录入页',
        movies: [
            {
                _id:1,
                title:'泰坦尼克号'
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
    res.render('pages/list', {
        title: 'imooc 列表页',
        movies: [{
            title: '我开始了',
            doctor: '沉默的羔羊',
            country: '美国',
            year: 2016,
            meta: {
                createAt: 20160501
            }
        }]
    });
});






