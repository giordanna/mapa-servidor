const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  marcadores: [
        {
          "id": "5572f58a498eef85adf4f1b4",
          "nome": "Porpino Burger",
          "endereco": "Jerônimo Pimentel, 242",
          "lat": -1.442430694656103,
          "lng": -48.488064103178374,
          "categoria": "Hamburgueria",
          "img": "https://fastly.4sqi.net/img/general/width960/21789324_2E9_KjuF0gbEvyXpKZECwylJ46jlHXdoiOVD3EzDLDg.jpg"
        },
        {
          "id":   "4c310017ac0ab71342201c1e",
          "nome": "Roxy Bar",
          "endereco": "Av. Senador Lemos, 231",
          "lat": -1.4412027502407205,
          "lng": -48.489757776260376,
          "categoria": "Restaurante Brasileiro",
          "img": "https://fastly.4sqi.net/img/general/width540/rOzIJJ-OZof180f5osQ6wIkPz0nSYlWgfTRZidmsV-k.jpg"
        },
        {
          "id": "4d95fca8daec224bf29d0b3e",
          "nome": "Cia. Paulista de Pizza",
          "endereco": "Av. Visc. de Souza Franco, 559",
          "lat": -1.443236819183104,
          "lng": -48.48991106226811,
          "categoria": "Pizzaria",
          "img": "https://fastly.4sqi.net/img/general/width720/ui_jo7sFhPgq4hrexbiDdouwf_l-3H4skjAUWadUQ4A.jpg"
        },
        {
          "id": "4eb732a9991165b76327d02e",
          "nome": "D'Opará",
          "endereco": "Av. Sen. Lemos",
          "lat": -1.4421665904806702,
          "lng": -48.48984166720438,
          "categoria": "Bar",
          "img": "https://fastly.4sqi.net/img/general/width720/32543379__rH7XAvKtJxn1zqDXEcMA9r0gvBWOnpjJFXdZhBxmww.jpg"
        },
        {
          "id": "4bd074c841b9ef3ba113fae5",
          "nome": "Cairu",
          "endereco": "Boulevard Shopping (Piso 4, Lj. 412)",
          "lat": -1.445670539090734,
          "lng": -48.48890663650532,
          "categoria": "Sorveteria",
          "img": "https://fastly.4sqi.net/img/general/width720/6311225_UWZLEqh5eRLIDSLeRnphkSDKU-c3SQnMsWFDTdHgeMA.jpg"
        }
    ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, marcador) => {
  if (!marcador.id) {
    marcador.id = Math.random().toString(36).substr(-8)
  }

  get(token).marcadores.push(marcador)

  return marcador
}

const remove = (token, id) => {
  const data = get(token)
  const marcador = data.marcadores.find(c => c.id === id)

  if (marcador) {
    data.marcadores = data.marcadores.filter(c => c !== marcador)
  }

  return { marcador }
}

module.exports = {
  get,
  add,
  remove
}
