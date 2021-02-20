// const { pool } = require('../util/database')

const { getCategoriesFromDb } = require('./model')

const getCategories = async (req, res) => {
  const { error, categories } = await getCategoriesFromDb()
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).send(categories.rows)
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
