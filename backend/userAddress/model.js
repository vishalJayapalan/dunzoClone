const { pool } = require('../util/database')

const getUserAddressFromDb = async userId => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM useraddress WHERE userAddress.user_id = $1`,
      [userId]
    )
    return { userAddress: rows }
  } catch (error) {
    return { error }
  }
}

const addUserAddressInDb = async (address, userId, category) => {
  const { rows } = await pool.query(
    `INSERT INTO useraddress (address,user_id,category) VALUES ($1,$2,$3) RETURNING *`,
    [address, userId, category]
  )
  return { userAddress: rows }
}

const updateUserAddressInDb = async (address, addressId) => {
  try {
    const { rows } = await pool.query(
      `UPDATE userAddress SET address = $1 WHERE id = $2 RETURNING *`,
      [address, addressId]
    )
    return { updatedUserAddress: rows }
  } catch (error) {
    return { error }
  }
}

const deleteUserAddressInDb = async addressId => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM useraddress WHERE id = $1 RETURNING *`,
      [addressId]
    )
    return { deletedUserAddress: rows }
  } catch (error) {
    return { error }
  }
}

module.exports = {
  getUserAddressFromDb,
  addUserAddressInDb,
  updateUserAddressInDb,
  deleteUserAddressInDb
}
