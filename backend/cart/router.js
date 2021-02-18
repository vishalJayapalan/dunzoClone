const router = require('express').Router()

const auth = require('../middleware/auth')

const {
  getCartItems,
  addItemToCart,
  deleteAllItemsFromCart,
  deleteItemFromCart,
  updateCartItem
} = require('./model')

router.get('/', getCartItems)

router.post('/', auth, addItemToCart)

router.delete('/all', auth, deleteAllItemsFromCart)

router.delete('/:cartid', auth, deleteItemFromCart)

router.put('/:cartid', updateCartItem)

module.exports = router
