const { pool } = require('../util/database')

const getOrder = async (req, res) => {
  const { orderid } = req.params
  try {
    const order = await pool.query(
      `SELECT * FROM orders WHERE orders.orderid = $1`,
      [orderid]
    )
    if (order.rowCount) return res.status(200).send(order.rows)
    else return res.status(400).send({ Msg: 'The order id is wrong' })
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const getAllUserOrders = async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ Msg: 'No valid user details found' })
  }
  const { userid } = req.user
  try {
    const orders = await pool.query(
      `SELECT * FROM orders where orders.userid = $1 ORDER BY orderid ASC`,
      [userid]
    )
    res.status(200).send(orders.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const getDeliveryGuyOrder = async (req, res) => {
  const { deliveryguyid } = req.deliveryguy
  try {
    const order = await pool.query(
      `SELECT * FROM orders WHERE orders.deliverypartnerid = $1 AND orders.delivered = $2`,
      [deliveryguyid, false]
    )
    res.status(200).send(order.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const addOrder = async (req, res) => {
  const { userid } = req.user
  const { deliveryaddress, shopaddress } = req.body
  try {
    const order = await pool.query(
      `INSERT INTO orders (userid,deliverypartnerid,deliveryaddress,shopaddress,orderpickedup,delivered) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [userid, 0, deliveryaddress, shopaddress, false, false]
    )
    res.status(201).send(order.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const updateOrder = async (req, res) => {
  const { orderid } = req.params
  const { name, value } = req.body
  try {
    const updatedOrder = await pool.query(
      `UPDATE orders SET $1 = $2 where orderid = $3 RETURNING *`,
      [name, value, orderid]
    )
    res.status(200).send(updatedOrder.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

module.exports = {
  getOrder,
  getAllUserOrders,
  getDeliveryGuyOrder,
  addOrder,
  updateOrder
}
