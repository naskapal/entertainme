const mongoose = require('mongoose').connect('mongodb://localhost/movies')

const tvSeries = mongoose.Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: String,
  tag: String,
  status: String
})

const tvSeriesModel = mongoose.model('Movies', tvSeries)

module.exports = tvSeriesModel
