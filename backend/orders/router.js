const Router = require('express').Router()

const auth = require('../middleware/auth')

const deliveryAuth = require('../middleware/deliveryAuth')

const {
  getOrder,
  addOrder,
  updateOrder,
  getDeliveryGuyOrder,
  getAllUserOrders
} = require('./controller')

Router.get('/all', auth, getAllUserOrders)

Router.get('/ongoing', deliveryAuth, getDeliveryGuyOrder)

Router.get('/:orderid', auth, getOrder)

Router.post('/', auth, addOrder)

Router.put('/:orderid', auth, updateOrder)

module.exports = Router
