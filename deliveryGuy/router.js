const Router = require('express').Router()

const deliveryAuth = require('../middleware/deliveryAuth')

const {
  registerDeliveryGuy,
  loginDeliveryGuy,
  getCurrentDeliveryGuy,
  onProcessOrderDelivery
} = require('./model')

Router.get('/', deliveryAuth, getCurrentDeliveryGuy)

Router.post('/', registerDeliveryGuy)

Router.post('/login', loginDeliveryGuy)

// Router.get('/ongoing',deliveryAuth,onProcessOrderDelivery)

module.exports = Router
