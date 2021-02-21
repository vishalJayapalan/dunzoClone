const { pool } = require('../util/database')

/* 
http://localhost:5000/cart
*/

const {
  getCartItemsFromDb,
  addItemToCartInDb,
  updateCartItemFromDb,
  deleteAllItemsFromCartInDb,
  deleteItemFromCartInDb
} = require('./model')

const getCartItems = async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const userId = req.user.id
  const { error, cartItems } = await getCartItemsFromDb(userId)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  return res.status(200).send(cartItems)
}

/* 
http://localhost:5000/cart
body: itemid,shopname
*/

const addItemToCart = async (req, res) => {
  const { itemId, shopId, itemQuantity } = req.body
  const userId = req.user.id
  const { cartItem, error } = await addItemToCartInDb(
    itemId,
    shopId,
    itemQuantity,
    userId
  )

  if (error) {
    return res.status(500).json({ Msg: error })``
  }
  res.status(201).json(cartItem)
}

/* 
http://localhost:5000/cart/:cartid
*/

const deleteItemFromCart = async (req, res) => {
  // await pool.query(`DELETE FROM cart where cartid = $1`, [req.params.cartid])
  const { cartId } = req.params
  const { error, deletedItemFromCart } = await deleteItemFromCartInDb(cartId)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }

  res.status(200).send({ Msg: 'DeletedSuccesfully' })
}

/* 
http://localhost:5000/cart/all
*/

const deleteAllItemsFromCart = async (req, res) => {
  const userId = req.user.id
  const { deletedItemsFromCart, error } = await deleteAllItemsFromCartInDb(
    userId
  )
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).send({ Msg: 'Deleted ALL items in cart of user Succesfully' })
}

/* 
http://localhost:5000/cart/:cartid
body: cartitemquantity
*/

const updateCartItem = async (req, res) => {
  let { quantity, type } = req.body
  const { cartId } = req.params
  if (type === '+') {
    quantity++
  } else {
    quantity--
  }
  try {
    const updatedCartItem = await pool.query(
      `UPDATE cart_item SET quantity = $1 WHERE id = $2 RETURNING *`,
      [quantity, cartId]
    )
    res.status(200).send(updatedCartItem.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

module.exports = {
  getCartItems,
  addItemToCart,
  updateCartItem,
  deleteAllItemsFromCart,
  deleteItemFromCart
}
