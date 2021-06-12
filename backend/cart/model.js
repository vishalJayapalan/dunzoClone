const { pool } = require('../util/database')

/* 
http://localhost:5000/cart
*/

const getCartItemsFromDb = async userId => {
  try {
    const { rows } = await pool.query(
      `SELECT 
      s.name AS shop_name,
      s.id AS shop_id,
      i.name AS name,
      i.id AS item_id,
      i.description AS description,
      i.price AS price,
      c.item_quantity as item_quantity,
      c.id as id
       FROM cart_item c JOIN item i ON c.item_id = i.id JOIN shop s ON i.shop_id = s.id where c.user_id= $1 ORDER BY c.id ASC`,
      [userId]
    )
    // const { rows } = await pool.query(
    //   `SELECT * FROM cart_item JOIN item ON cart_item.item_id = item.id where cart_item.user_id= $1 ORDER BY cart_item.id ASC`,
    //   [userId]
    // )
    return { cartItems: rows }
  } catch (e) {
    console.log('ERROR', e)
    return { error: e }
  }
}

/* 
http://localhost:5000/cart
body: itemid,shopname
*/

const addItemToCartInDb = async (itemId, shopId, quantity, userId) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO cart_item (item_id,shop_id,item_quantity,user_id) VALUES ($1,$2,$3,$4) RETURNING *`,
      [itemId, shopId, quantity, userId]
    )
    return { cartItem: rows }
  } catch (e) {
    return { error: e }
  }
}

/* 
http://localhost:5000/cart/:cartid
*/

const deleteItemFromCartInDb = async cartId => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM cart_item where id = $1 RETURNING *`,
      [cartId]
    )
    return { deletedItemFromCart: rows }
  } catch (error) {
    return { error: error }
  }
}

/* 
http://localhost:5000/cart/all
*/

const deleteAllItemsFromCartInDb = async userId => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM cart_item WHERE user_id = $1`,
      [userId]
    )
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
