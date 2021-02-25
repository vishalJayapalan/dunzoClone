const { pool } = require('../util/database')

const getOrderFromDb = async orderId => {
  try {
    // console.log('ORDERID', orderId)
    const { rows } = await pool.query(`SELECT * FROM orders WHERE id = $1`, [
      orderId
    ])
    // console.log(rows)
    return { order: rows }
  } catch (error) {
    return { error }
  }
}

const getAllUserOrdersFromDb = async userId => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM orders where orders.user_id = $1 ORDER BY id ASC`,
      [userId]
    )
    return { orders: rows }
  } catch (error) {
    return { error }
  }
}

const getDeliveryGuyOrderFromDb = async deliverGuyId => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM orders WHERE orders.delivery_guy_id = $1 AND orders.status != $2`,
      [deliverGuyId, 'delivered']
    )
    return { order: rows }
  } catch (error) {
    return { error }
  }
}

const addOrderInDb = async (userId, deliveryaddress, shopaddress) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO orders (user_id,delivery_guy_id,delivery_address,shop_address,status) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [userId, 0, deliveryaddress, shopaddress, 'ready']
    )
    return { addedOrder: rows }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

const updateOrderInDb = async (name, value, id) => {
  try {
    // console.log('INUPDATEORDER', name, value, id)
    const { rows } = await pool.query(
      `UPDATE orders SET ${name} = $1 where id = $2 RETURNING *`,
      [value, id]
    )
    return { updatedOrder: rows }
  } catch (error) {
    return { error }
  }
}

module.exports = {
  getOrderFromDb,
  getAllUserOrdersFromDb,
  getDeliveryGuyOrderFromDb,
  addOrderInDb,
  updateOrderInDb
}
