const app = require('express')()
      tvSeries = require('./model')
      cors = require('cors')
      bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())
      
app.get('/', (req, res) => {
  res.send('tvSeries server works')
})

app.get('/tvseries', (req, res) => {
  // nanti taruh disini untuk akses db tvseries
  tvSeries.find()
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
})

app.post('/tvseries', (req, res) => {
  tvSeries.create(req.body)
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
})

app.listen(3002,() => console.log('listening on 3002'))
