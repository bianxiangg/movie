var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);

console.log('imooc start on port', port);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'imooc 首页'
    })
});

app.get('/detail/:id', function (req, res) {
    res.render('index', {
        title: 'imooc 详情页'
    })
});

app.get('/admin/movie', function (req, res) {
    res.render('index', {
        title: 'imooc 后台录入页'
    })
});

app.get('/admin/list', function (req, res) {
    res.render('index', {
        title: 'imooc 列表页'
    })
});



