const { pool } = require('../util/database')

const checkUserFromDb = async email => {
  try {
    const user = await pool.query(`SELECT * FROM users where email=$1`, [email])
    return { user }
  } catch (error) {
    return { error }
  }
}

const createUserInDb = async (fullName, email, password) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (full_name,email,password) VALUES ($1,$2,$3) RETURNING *`,
      [fullName, email, password]
    )
    return { newUser: rows }
  } catch (error) {
    return { error }
  }
}

const getCurrentUserFromDb = async userId => {
  try {
    const currentUser = await pool.query(
      `SELECT id, full_name,email FROM users WHERE id = $1`,
      [userId]
    )
    return { currentUser }
  } catch (error) {
    return { error }
  }
}

module.exports = { checkUserFromDb, getCurrentUserFromDb, createUserInDb }
