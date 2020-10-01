const { pool } = require('../util/database')

const getOrder = async (req, res) => {
  const { orderid } = req.params
  console.log('orderid', orderid)
  try {
    const order = await pool.query(
      `SELECT * FROM orders WHERE orders.orderid = ${orderid}`
    )
    res.status(200).send(order.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const getAllUserOrders = async (req, res) => {
  const { userid } = req.user
  try {
    const orders = await pool.query(
      `SELECT * FROM orders where order.userid = ${userid}`
    )
    console.log('getting all user orders:', orders)
    res.status(200).send(orders.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const getDeliveryGuyOrder = async (req, res) => {
  const { deliveryguyid } = req.params
  try {
    const order = await pool.query(
      `SELECT * FROM orders WHERE order.deliverypartnerid = ${deliveryguyid} AND order.delivered = ${false}`
    )
    console.log('delivery Guys order', order.rows)
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
      `INSERT INTO orders (userid,deliverypartnerid,deliveryaddress,shopaddress,orderpickedup,delivered) VALUES ('${userid}','${0}','${deliveryaddress}','${shopaddress}','${false}','${false}') RETURNING *`
    )
    res.status(201).send(order.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const updateOrder = async (req, res) => {
  const { orderid } = req.params
  const { name, value } = req.body
  console.log(name, value)
  try {
    const updatedOrder = await pool.query(
      `UPDATE orders SET ${name} = '${value}' where orderid = ${orderid} RETURNING *`
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