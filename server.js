// baseado em:
// https://github.com/udacity/reactnd-contacts-server

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const marcadores = require('./marcadores')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  const help = `
  <pre>
    Bem-vindo a API do Mapa do Bairro!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /marcadores
    DELETE /marcadores/:id
    POST /marcadores { id, nome, endereco, lat, lng, img }
  </pre>
  `

  res.send(help)
})

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Favor providenciar Authorization no header para se identificar'
    })
  }
})

app.get('/marcadores', (req, res) => {
  res.send(marcadores.get(req.token))
})

app.delete('/marcadores/:id', (req, res) => {
  res.send(marcadores.remove(req.token, req.params.id))
})

app.post('/marcadores', bodyParser.json(), (req, res) => {
  const { id, nome, endereco, lat, lng, img } = req.body

  if (id && nome && endereco && lat && lng && img) {
    res.send(marcadores.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: 'Verifique os dados enviados'
    })
  }
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
