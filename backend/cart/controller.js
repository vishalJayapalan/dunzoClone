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

  const { userid } = req.user
  const { error, cartItems } = await getCartItemsFromDb(userid)
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
  const { itemid, itemname, shopname, cartitemquantity, item } = req.body
  const { userid } = req.user
  const { cartItem, error } = await addItemToCartInDb(
    itemid,
    itemname,
    shopname,
    cartitemquantity,
    userid
  )

  if (error) {
    return res.status(500).json({ Msg: error })``
  }
  res.status(201).send(cartItem)
}

/* 
http://localhost:5000/cart/:cartid
*/

const deleteItemFromCart = async (req, res) => {
  // await pool.query(`DELETE FROM cart where cartid = $1`, [req.params.cartid])
  const { cartid } = req.params
  const { error, deletedItemFromCart } = await deleteItemFromCartInDb(cartid)
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
  const { userid } = req.user
  const { deletedItemsFromCart, error } = await deleteAllItemsFromCartInDb(
    userid
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
  let { cartitemquantity, type } = req.body
  const { cartid } = req.params
  if (type === '+') {
    cartitemquantity++
  } else {
    cartitemquantity--
  }
  try {
    const updatedCartItem = await pool.query(
      `UPDATE cart SET cartitemquantity = $1 WHERE cartid = $2 RETURNING *`,
      [cartitemquantity, cartid]
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
