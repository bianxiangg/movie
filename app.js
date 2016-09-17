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
                _id: 1,
                title: '泰坦尼克号',
                poster: 'http://ch.sratim.co.il/photos/titles/normal/0/m56950_20130830195300_141716753457.jpg',

            },
            {
                _id: 1,
                title: '泰坦尼克号',
                poster: 'http://ch.sratim.co.il/photos/titles/normal/0/m56950_20130830195300_141716753457.jpg',

            },
            {
                _id: 1,
                title: '泰坦尼克号',
                poster: 'http://ch.sratim.co.il/photos/titles/normal/0/m56950_20130830195300_141716753457.jpg',

            },
            {
                _id: 1,
                title: '泰坦尼克号',
                poster: 'http://ch.sratim.co.il/photos/titles/normal/0/m56950_20130830195300_141716753457.jpg',

            },
            {
                _id: 1,
                title: '泰坦尼克号',
                poster: 'http://ch.sratim.co.il/photos/titles/normal/0/m56950_20130830195300_141716753457.jpg',

            }
        ],

    });
});

app.get('/detail/:id', function (req, res) {
    res.render('pages/detail', {
        title: 'imooc 详情页',
        movies: [
            {
                _id: 1,
                title: '泰坦尼克号'
            }
        ],
        movie: {
            flash: 'http://player.youku.com/player.php/sid/XMTcyNjE4NzE4OA==/v.swf',
            title: '机械战警',
            doctor: 'XXXX、',
            country: '米国',
            language: '英语',
            year: 2016,
            summary: '挺好看的一电影'
        }
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
        },
            {
                title: '我开始了',
                doctor: '沉默的羔羊',
                country: '美国',
                year: 2016,
                meta: {
                    createAt: 20160501
                }
            },
            {
                title: '我开始了',
                doctor: '沉默的羔羊',
                country: '美国',
                year: 2016,
                meta: {
                    createAt: 20160501
                }
            },
            {
                title: '我开始了',
                doctor: '沉默的羔羊',
                country: '美国',
                year: 2016,
                meta: {
                    createAt: 20160501
                }
            }
        ]
    });
});






