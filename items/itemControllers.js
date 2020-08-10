require('dotenv').config()

const { pool } = require('../util/database')

const getItems = async (req, res) => {
  try {
    await pool.query(
      'SELECT * FROM items ORDER BY itemId ASC',
      (error, results) => {
        if (error) throw error
        res.status(200).send(results.rows)
      }
    )
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

module.exports = { getItems }
