const { pool } = require('../util/database')

/* 
http://localhost:5000/cart
*/

const getCartItemsFromDb = async userid => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM cart JOIN items ON cart.itemid = items.itemid where cart.userid= $1 ORDER BY cartid ASC',
      [userid]
    )
    return { cartItems: rows }
  } catch (e) {
    return { error: e }
  }
}

/* 
http://localhost:5000/cart
body: itemid,shopname
*/

const addItemToCartInDb = async (
  itemid,
  itemname,
  shopname,
  cartitemquantity,
  userid
) => {
  try {
    const cartItem = await pool.query(
      `INSERT INTO cart (itemid,itemname,shopname,cartitemquantity,userid) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [itemid, itemname, shopname, cartitemquantity, userid]
    )
    return { cartItem: cartItem.rows }
  } catch (e) {
    return { error: e }
  }
}

/* 
http://localhost:5000/cart/:cartid
*/

const deleteItemFromCartInDb = async cartid => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM cart where cartid = $1 RETURNING *`,
      [cartid]
    )
    return { deletedItemFromCart: rows }
  } catch (error) {
    return { error: error }
  }
}

/* 
http://localhost:5000/cart/all
*/

const deleteAllItemsFromCartInDb = async userid => {
  try {
    const { rows } = await pool.query(`DELETE FROM cart WHERE userid = $1`, [
      userid
    ])
    return { deletedItemsFromCart: rows }
  } catch (error) {
    return { error: error }
  }
}

/* 
http://localhost:5000/cart/:cartid
body: cartitemquantity
*/

const updateCartItemFromDb = async () => {}

module.exports = {
  getCartItemsFromDb,
  addItemToCartInDb,
  updateCartItemFromDb,
  deleteAllItemsFromCartInDb,
  deleteItemFromCartInDb
}
