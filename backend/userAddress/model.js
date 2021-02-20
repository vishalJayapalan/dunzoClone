const { pool } = require('../util/database')

const getUserAddress = async (req, res) => {
  if (!req.user) return res.status(404).json({ Msg: 'Not Authenticated' })
  const { userid } = req.user
  try {
    const userAddress = await pool.query(
      `SELECT * FROM useraddresses WHERE userAddresses.userid = $1`,
      [userid]
    )
    res.status(200).send(userAddress.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const addUserAddress = async (req, res) => {
  const { address, category } = req.body
  const { userid } = req.user
  try {
    const userAddress = await pool.query(
      `INSERT INTO useraddresses (address,userid,category) VALUES ($1,$2,$3) RETURNING *`,
      [address, userid, category]
    )
    res.status(201).send(userAddress.rows)
  } catch (err) {
    res.status(500).json({ Msg: err })
  }
}

const updateUserAddress = async (req, res) => {
  let { address } = req.body
  const { addressid } = req.params
  try {
    const updatedUserAddress = await pool.query(
      `UPDATE userAddresses SET address = $1 WHERE addressid = $2 RETURNING *`,
      [address, addressid]
    )
    res.status(200).send(updatedUserAddress.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const deleteUserAddress = async (req, res) => {
  const { addressid } = req.params
  try {
    const userAddresses = await pool.query(
      `DELETE FROM useraddresses WHERE addressid = $1 RETURNING *`,
      [addressid]
    )
    res.status(200).send(userAddresses.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

module.exports = {
  getUserAddress,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
}
