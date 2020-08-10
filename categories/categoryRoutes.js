// const { getCategories } = require('./categoryControllers')

const router = require('express').Router()

const categoryControllers = require('./categoryController')

router.get('/', categoryControllers.getCategories)

module.exports = router
