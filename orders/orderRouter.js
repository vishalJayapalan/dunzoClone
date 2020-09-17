const Router = require('express').Router()

const { getOrder, addOrder, updateOrder } = require('./orderModel')

Router.get('/:orderid', getOrder)

Router.post('/:userid', addOrder)

Router.put('/:orderid', updateOrder)

module.exports = Router
