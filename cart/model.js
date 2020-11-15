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
  const { itemid, itemname, shopname, cartitemquantity, item } = req.body
  const { userid } = req.user
  try {
    const cartItems = await pool.query(
      `INSERT INTO cart (itemid,itemname,shopname,cartitemquantity,userid) VALUES ('${itemid}','${itemname}','${shopname}','${cartitemquantity}','${userid}') RETURNING *`
    )
    // console.log(addedCartId)
    // const cartJoinItem = await pool.query(
    //   `SELECT * FROM cart JOIN items ON cart.itemid = items.itemid WHERE cartid = ${cartItems}`
    // )
    // console.log(cartJoinItem.rows)
    res.status(201).send(cartItems.rows)
  } catch (err) {
    res.status(500).json({ Msg: err })
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
  const { userid } = req.user
  try {
    await pool.query(`DELETE FROM cart WHERE userid=${userid}`)
    res
      .status(200)
      .send({ Msg: 'Deleted ALL items in cart of user Succesfully' })
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
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
      `UPDATE cart SET cartitemquantity = ${cartitemquantity} WHERE cartid = ${cartid} RETURNING *`
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
