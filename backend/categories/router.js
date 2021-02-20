const router = require('express').Router()
// const auth = require('../middleware/auth')
const { getCategories } = require('./controller')

router.get('/', getCategories)

module.exports = router
