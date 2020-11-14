const router = require('express').Router()
// const auth = require('../middleware/auth')
const { getCategories } = require('./categoryModel')

router.get('/', getCategories)

module.exports = router
