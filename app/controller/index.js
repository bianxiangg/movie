var Movie = require('../models/movie.js');

exports.index = function (req, res) {
  console.log('already have session: ', req.session.user);
      Movie.fetch(function (err, docs) {
          res.render('pages/index', {
              title: 'imooc 首页',
              movies: docs
          });
      });
};