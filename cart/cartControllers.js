const { pool } = require('../util/database')

/* 
http://localhost:5000/cart
*/

const getCartItems = async (req, res) => {
  try {
    const cartItems = await pool.query(
      'SELECT * FROM cart JOIN items ON cart.itemid = items.itemid ORDER BY cartid ASC'
    )
    res.status(200).send(cartItems.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

/* 
http://localhost:5000/cart
body: itemid,shopname
*/

const addItemToCart = async (req, res) => {
  const { itemid, shopname } = req.body
  try {
    const cartItems = await pool.query(
      `INSERT INTO cart(itemid,shopname,cartitemquantity) VALUES ('${itemid}','${shopname}',1) RETURNING cartid`
    )
    res.status(201).send(cartItems.rows[0].cartid.toString())
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

/* 
http://localhost:5000/cart/:cartid
*/

const deleteItemFromCart = async (req, res) => {
  try {
    await pool.query(`DELETE FROM cart where cartid = ${req.params.cartid}`)
    res.status(200).send({ Msg: 'DeletedSuccesfully' })
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

/* 
http://localhost:5000/cart/all
*/

const deleteAllItemsFromCart = async (req, res) => {
  try {
    await pool.query(`DELETE FROM cart`)
    res.status(200).send({ Msg: 'Deleted ALL Succesfully' })
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

/* 
http://localhost:5000/cart/:cartid
body: cartitemquantity
*/

const updateCartItem = async (req, res) => {
  const { cartitemquantity } = req.body
  const { cartid } = req.params
  try {
    await pool.query(
      `UPDATE cart SET cartitemquantity = ${cartitemquantity} WHERE cartid = ${cartid}`
    )
    res.status(200).send({ Msg: 'updated Succesfully' })
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
