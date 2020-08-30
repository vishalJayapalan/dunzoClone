const Router = require('express').Router()

const { getShops } = require('./shopModel')

Router.get('/:categoryid', getShops)

module.exports = Router
