const router = require('express').Router()

const { getCategories } = require('./categoryModel')

router.get('/', getCategories)

module.exports = router
