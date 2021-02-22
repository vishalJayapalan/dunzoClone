const { pool } = require('../util/database')

const getDeliveryGuyFromDb = async email => {
  try {
    const deliveryGuy = await pool.query(
      `SELECT * FROM delivery_guy where email=$1`,
      [email]
    )
    return { deliveryGuy }
  } catch (error) {
    return { error }
  }
}

const registerNewDeliveryGuy = async (name, email, password) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO delivery_guy (name,email,password) VALUES ($1,$2,$3) RETURNING *`,
      [name, email, password]
    )
    return { newDeliveryGuy: rows }
  } catch (error) {
    return { error }
  }
}

const getCurrentDeliveryGuyFromDb = async deliveryGuyId => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name FROM delivery_guy WHERE id = $1`,
      [deliveryGuyId]
    )
    return { deliveryGuy: rows }
  } catch (error) {
    return { error }
  }
}

module.exports = {
  getDeliveryGuyFromDb,
  registerNewDeliveryGuy,
  getCurrentDeliveryGuyFromDb
}
