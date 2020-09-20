const Router = require('express').Router()

const auth = require('../middleware/auth')

const { getOrder, addOrder, updateOrder } = require('./orderModel')

Router.get('/:orderid', auth, getOrder)

Router.post('/', auth, addOrder)

Router.put('/:orderid', auth, updateOrder)

module.exports = Router
