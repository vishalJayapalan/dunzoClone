const Router = require('express').Router()

const {
  registerDeliveryGuy,
  loginDeliveryGuy,
  getCurrentDeliveryGuy
} = require('./deliveryGuyModel')

Router.get('/', getCurrentDeliveryGuy)

Router.post('/', registerDeliveryGuy)

Router.post('/login', loginDeliveryGuy)

module.exports = Router
