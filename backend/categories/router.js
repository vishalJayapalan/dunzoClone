const router = require('express').Router()
// const auth = require('../middleware/auth')
const { getCategories } = require('./model')

router.get('/', getCategories)

module.exports = router
