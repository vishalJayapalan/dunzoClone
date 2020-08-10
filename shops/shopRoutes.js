const Router = require('express').Router()

const shopController = require('./shopControllers')

Router.get('/:categoryid', shopController.getShops)

module.exports = Router
