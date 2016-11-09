var User = require('../models/user.js');

exports.logout = function (req, res) {
  delete req.session.user;
  res.redirect('/');
};

exports.signUp = function (req, res) {
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
};

exports.list = function  (req, res) {
  User.fetch(function(err, users) {
          if (err) {
              console.log(err);
          }
          res.render('pages/userlist', {
              users: users 
              });
      });
};

exports.signIn = function (req, res) {
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
};

exports.showSignin = function (req, res) {
    res.render('pages/signin', {
        title: '注册'
    });
};

exports.showSignup = function (req, res) {
    res.render('pages/signup', {
        title: '登陆'
    });
};

