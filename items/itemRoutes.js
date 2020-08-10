// const { getItems } = require('./itemControllers')

const router = require('express').Router()

const itemControllers = require('./itemControllers')

router.get('/', itemControllers.getItems)

module.exports = router
