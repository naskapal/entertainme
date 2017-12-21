const mongoose = require('mongoose').connect('mongodb://localhost/movies')

const moviesSchema = mongoose.Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: String,
  tag: String,
  status: String
})

const moviesModel = mongoose.model('Movies', moviesSchema)

module.exports = moviesModel
