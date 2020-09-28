const Router = require('express').Router()

const { getShops, getShop } = require('./shopModel')

Router.get('/:categoryid', getShops)

Router.get('/shop/:shopid', getShop)

module.exports = Router
