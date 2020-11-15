const router = require('express').Router()

const { getItems } = require('./model')

router.get('/:shopid', getItems)

module.exports = router
