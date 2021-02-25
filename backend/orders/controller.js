const {
  getOrderFromDb,
  getAllUserOrdersFromDb,
  getDeliveryGuyOrderFromDb,
  updateOrderInDb,
  addOrderInDb
} = require('./model')

const getOrder = async (req, res) => {
  const { orderid } = req.params
  // console.log('ORDERID', orderid)
  const { order, error } = await getOrderFromDb(orderid)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  // console.log('ORDER', order)
  return res.status(200).json(order)
}

const getAllUserOrders = async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ Msg: 'No valid user details found' })
  }
  const userId = req.user.id
  // console.log('USERID', userId)
  const { orders, error } = await getAllUserOrdersFromDb(userId)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).send(orders)
}

const getDeliveryGuyOrder = async (req, res) => {
  const { id } = req.deliveryguy
  console.log('ID', id)
  const { order, error } = await getDeliveryGuyOrderFromDb(id)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  // console.log('ORDER', order)
  res.status(200).send(order)
}

const addOrder = async (req, res) => {
  const userId = req.user.id
  const { deliveryaddress, shopaddress } = req.body
  // console.log(userId, deliveryaddress, shopaddress)

  const { addedOrder, error } = await addOrderInDb(
    userId,
    deliveryaddress,
    shopaddress
  )
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(201).send(addedOrder)
}

const updateOrder = async (req, res) => {
  const { orderid } = req.params
  const { name, value } = req.body

  const { updatedOrder, error } = await updateOrderInDb(name, value, orderid)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).send(updatedOrder.rows)
}

module.exports = {
  getOrder,
  getAllUserOrders,
  getDeliveryGuyOrder,
  addOrder,
  updateOrder
}
