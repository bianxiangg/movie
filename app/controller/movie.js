var Movie = require('../models/movie.js');
var _ = require('underscore');

exports.detail = function (req, res) {
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
};

exports.adminMovie = function (req, res) {
  res.render('pages/admin', {
          title: 'imooc 后台录入页',
          movie: {}
      });
};

exports.movieList = function (req, res) {
  Movie.fetch(function (err, docs) {
          res.render('pages/list', {
              title: 'imooc 首页',
              movies: docs
          });
      });
};

exports.movieNew = function (req, res) {
  console.log(req.body);
      newMovie = req.body.movie;
      var movie = new Movie();
      movie = _.extend(movie, newMovie);
      movie.save(function (err, doc) {
          res.redirect('/detail/' + doc._id);
      });
};

exports.delMovie = function (req, res) {
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
};

exports.movieUpdate = function (req, res) {
  var id = req.params.id;
      if (id) {
          Movie.findById(id, function (err, movie) {
              res.render('pages/admin', {
                  title: '更新电影数据',
                  movie: movie
              });
          });
      }
};