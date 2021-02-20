const { pool } = require('../util/database')
const { getItemsFromDb } = require('./model')

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

module.exports = { getItems }
