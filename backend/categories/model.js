const { pool } = require('../util/database')

const getCategoriesFromDb = async () => {
  try {
    const categories = await pool.query(
      'SELECT * FROM category ORDER BY id ASC'
    )
    return { categories, error: false }
  } catch (e) {
    return { error: e }
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

module.exports = { getCategoriesFromDb }
