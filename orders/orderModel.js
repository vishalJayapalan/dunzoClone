const { pool } = require('../util/database')

const getOrder = async (req, res) => {
  const { orderid } = req.params
  try {
    const order = await pool.query(
      `SELECT * FROM orders WHERE orders.orderid = ${orderid}`
    )
    res.status(200).send(order.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const addOrder = async (req, res) => {
  const { userid } = req.params
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
  try {
    const updatedOrder = await pool.query(
      `UPDATE orders SET ${name} = ${value} where orderid = ${orderid} RETURNING *`
    )
    res.status(200).send(updatedOrder.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

module.exports = { getOrder, addOrder, updateOrder }
