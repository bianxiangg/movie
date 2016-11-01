var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

userSchema.pre('save' ,function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  this.meta.updateAt = Date.now();
  var user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};

module.exports = userSchema;