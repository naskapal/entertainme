const app = require('express')()
      Movies = require('./model')
      cors = require('cors')
      bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('movies server works')
})

app.get('/movies', (req, res) => {
  // nanti taruh disini untuk akses db movies
  Movies.find()
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
})

app.post('/movies', (req, res) => {
  console.log("masuk routing disini")
  console.log(req.body)
  Movies.create(req.body)
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
})

app.listen(3001,() => console.log('listening on 3001'))
