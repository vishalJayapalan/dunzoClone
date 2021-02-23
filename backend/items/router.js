const router = require('express').Router()

const { getItems, addItem, updateItem, deleteItem } = require('./controller')

router.get('/:shopid', getItems)

router.post('/', addItem)

router.put('/:id', updateItem)

router.delete(':/id', deleteItem)

module.exports = router
