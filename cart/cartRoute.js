const router = require('express').Router()

const {
  getCartItems,
  addItemToCart,
  deleteAllItemsFromCart,
  deleteItemFromCart,
  updateCartItem
} = require('./cartModel')

router.get('/', getCartItems)

router.post('/', addItemToCart)

router.delete('/all', deleteAllItemsFromCart)

router.delete('/:cartid', deleteItemFromCart)

router.put('/:cartid', updateCartItem)

module.exports = router
