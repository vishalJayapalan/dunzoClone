const router = require('express').Router()

const { getItems } = require('./itemModel')

router.get('/:shopid', getItems)

module.exports = router
