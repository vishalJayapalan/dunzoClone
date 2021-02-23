// const { pool } = require('../util/database')

// TODO: WORK ON ALL OTHER FUNCTIONS OTHER THAN GETITEMS

const {
  getItemsFromDb,
  addItemInDb,
  updateItemInDb,
  deleteItemInDb
} = require('./model')

const getItems = async (req, res) => {
  const { shopid } = req.params
  const { items, error } = await getItemsFromDb(shopid)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(items)
}

const addItem = async (req, res) => {
  const shop_id = req.user.id
  const { name, sub_category, description, price, total_quantity } = req.body
  const { addedItem, error } = await addItemInDb(
    name,
    sub_category,
    description,
    price,
    total_quantity,
    shop_id
  )
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }

  res.status(200).json(addedItem)
}

const updateItem = async (req, res) => {
  const { id } = req.params
  const { error, updatedItem } = await updateItemInDb()
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }

  res.status(200).json(updatedItem)
}

const deleteItem = async (req, res) => {
  const { id } = req.params
  const { error, deletedItem } = await deleteItemInDb(cartId)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }

  res.status(200).json({ Msg: 'DeletedSuccesfully' })
}

module.exports = { getItems, addItem, updateItem, deleteItem }
