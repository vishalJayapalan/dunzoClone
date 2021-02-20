const Router = require('express').Router()

const { getShops, getShop } = require('./controller')

Router.get('/:categoryid', getShops)

Router.get('/shop/:shopid', getShop)

module.exports = Router
