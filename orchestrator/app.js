const app = require('express')()
      axios = require('axios')
      cors = require('cors')
      bodyParser = require('body-parser')
      responseTime = require('response-time')
      redis = require('redis')
      cache = redis.createClient()
      
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())
app.use(responseTime())

cache.on('error', err => {
  console.log("Redis error", err)
})

app.get('/', (req, res) => {
  res.send('orchestrator server works')
})

app.get('/movies', (req, res) => {
  // ambil dari api server movies
  cache.get('allMovies', (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (data) {
      res.status(200).send(JSON.parse(data))
    } else {
      axios.get('http://localhost:3001/movies')
      .then(success => {
        cache.setex('allMovies', 120, JSON.stringify(success.data))
        res.status(200).send(success.data)
      })
      .catch(error => res.status(500).send(error))
    }
  })
})

app.post('/movies', (req, res) => {
  // ambil dari api server movies
  axios.post('http://localhost:3001/movies', req.body)
    .then(success => {
      console.log(success.data)
      res.status(200).send(success.data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

app.get('/tvseries', (req, res) => {
  // ambil dari api server movies
  axios.get('http://localhost:3002/')
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
})

app.post('/tvseries', (req, res) => {
  // ambil dari api server movies
  axios.post('http://localhost:3002/', req.body)
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
})

app.listen(3000,() => console.log('listening on 3000'))
