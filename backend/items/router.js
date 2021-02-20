const router = require('express').Router()

const { getItems } = require('./controller')

router.get('/:shopid', getItems)

module.exports = router
