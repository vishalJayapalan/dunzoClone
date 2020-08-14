const router = require('express').Router()

const cartControllers = require('./cartControllers')

router.get('/', cartControllers.getCartItems)

router.post('/', cartControllers.addItemToCart)

router.delete('/all', cartControllers.deleteAllItemsFromCart)

router.delete('/:cartid', cartControllers.deleteItemFromCart)

router.put('/:cartid', cartControllers.updateCartItem)

module.exports = router
