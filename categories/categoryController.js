require('dotenv').config()

const { pool } = require('../util/database')

const getCategories = async (req, res) => {
  try {
    const categories = await pool.query(
      'SELECT * FROM categories ORDER BY categoryid ASC'
    )
    res.status(200).send(categories.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

// const postCategories = async (req, res) => {
//  const categoryName = {req.body.categoryname}
//   try {
// const results = await pool.query('INSERT INTO categories(categoryname) VALUES (`${categoryName}) RETURNING category_id')
//       response.status(201).send(results.rows[0].id.toString())
//   } catch (err) {
//     res.status(500).json({ Msg: 'There was an error please try again later' })
//   }
// }

module.exports = { getCategories }
