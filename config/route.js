var _ = require('underscore');
var Movie = require('../app/controller/movie.js');
var User = require('../app/controller/user.js');
var index = require('../app/controller/index.js');

module.exports = function (app) {
  
  //如果用户处于登陆状态，显示欢迎界面
  app.use(function (req, res, next) {
      var user = req.session.user;
      app.locals.user = user;
      next();
  });

  app.get('/', index.index);
  app.get('/detail/:id', Movie.detail);
  app.get('/admin/movie', Movie.adminMovie);
  app.get('/admin/list', Movie.movieList);
  app.post('/admin/movie/new', Movie.movieNew);
  app.delete('/admin/list', Movie.delMovie);
  app.get('/admin/update/:id', Movie.movieUpdate); 


  /**
   * 用户退出
   */
  app.get('/logout', User.logout);
  /**
   * 用户注册
   */
  app.post('/user/signUp', User.signUp);

  /**
   * 用户列表展示
   */
  app.get('/user/list', User.list);


  /**
   * 登陆验证
   */
  app.post('/user/signIn', User.signIn);
};
