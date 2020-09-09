const { pool } = require('../util/database')

const getUserAddress = async (req, res) => {
  const { userid } = req.params
  try {
    // const userAddress = await pool.query(
    //   `SELECT * FROM useraddresses JOIN users ON users.userid = useraddresses.userid WHERE users.userid = ${userid}`
    // )
    const userAddress = await pool.query(
      `SELECT * FROM useraddresses WHERE userAddresses.userid = ${userid}`
    )
    res.status(200).send(userAddress.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const addUserAddress = async (req, res) => {
  const { address } = req.body
  const { userid } = req.params
  try {
    const userAddress = await pool.query(
      `INSERT INTO useraddresses (address,userid) VALUES ('${address}','${userid}') RETURNING *`
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
      `UPDATE userAddresses SET address = ${address} WHERE addressid = ${addressid} RETURNING *`
    )
    res.status(200).send(updatedUserAddress.rows)
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error please try again later' })
  }
}

const deleteUserAddress = async (req, res) => {}

module.exports = {
  getUserAddress,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
}
