var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  passowrd: String,
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
  next();
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

module.exports = movieSchema;