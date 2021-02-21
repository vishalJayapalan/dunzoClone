const router = require('express').Router()

const auth = require('../middleware/auth')

const {
  getCartItems,
  addItemToCart,
  deleteAllItemsFromCart,
  deleteItemFromCart,
  updateCartItem
} = require('./controller')

router.get('/', auth, getCartItems)

router.post('/', auth, addItemToCart)

router.delete('/all', auth, deleteAllItemsFromCart)

router.delete('/:cartId', auth, deleteItemFromCart)

router.put('/:cartId', updateCartItem)

module.exports = router
