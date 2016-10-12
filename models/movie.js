var mongoose = require('mongoose');
var movieSchema = require('../schemas/movie.js');
var Movie = mongoose.movie('Movie', movieSchema);

module.exports = Movie;