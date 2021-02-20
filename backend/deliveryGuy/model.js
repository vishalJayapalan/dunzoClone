require('dotenv').config()
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const { pool } = require('../util/database')

const registerDeliveryGuy = async (req, res) => {
  let { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all the fields' })
  }
  try {
    const duplicateUser = await pool.query(
      `SELECT * FROM deliveryguys where emailid=$1`,
      [email]
    )
    if (!duplicateUser.rowCount) {
      password = await bcrypt.hash(password, 10)
      const newDeliveryGuy = await pool.query(
        `INSERT INTO deliveryguys (deliveryguyname,emailid,password) VALUES ($1,$2,$3) RETURNING *`,
        [name, email, password]
      )
      const accessToken = jwt.sign(
        { userid: newDeliveryGuy.rows[0].userid },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 }
      )
      return res
        .status(201)
        .cookie('deliveryguy-token', accessToken, { maxAge: 3600000 })
        .json({
          deliveryguy: newDeliveryGuy.rows[0].deliveryguyid,
          accessToken
        })
    }
    return res.status(400).json({ msg: 'Email already exists' })
  } catch (err) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
}

const loginDeliveryGuy = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(200).json({ msg: 'Please Enter all fields' })
  try {
    const deliveryGuy = await pool.query(
      `SELECT * FROM deliveryguys WHERE emailid= $1 `,
      [email]
    )
    if (!deliveryGuy.rowCount) {
      return res.status(400).json({ msg: 'your email or password is wrong' })
    }
    const isMatch = await bcrypt.compare(password, deliveryGuy.rows[0].password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'your email or password is wrong' })
    }
    const accessToken = jwt.sign(
      { deliveryguyid: deliveryGuy.rows[0].deliveryguyid },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 3600 }
    )
    return res
      .status(200)
      .cookie('deliveryguy-token', accessToken, { maxAge: 3600000 })
      .json({
        deliveryguyid: deliveryGuy.rows[0].deliveryguyid,
        accessToken
      })
  } catch (err) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
}

const getCurrentDeliveryGuy = async (req, res) => {
  const { deliveryguyid } = req.deliveryguy
  try {
    if (!deliveryguyid) res.status(401).json({ message: 'not authenticated' })
    const deliveryGuy = await pool.query(
      `SELECT deliveryguyid, deliveryguyname FROM deliveryguys WHERE deliveryguyid = $1`,
      [deliveryguyid]
    )

    if (!deliveryGuy.rowCount) {
      return res.status(400).json({ message: 'User not found' })
    }
    return res.status(200).json({
      deliveryguyid: deliveryGuy.rows[0].deliveryguyid,
      deliveryguyname: deliveryGuy.rows[0].deliveryguyname
    })
  } catch (err) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
}

// const onProcessOrderDelivery = async (req, res) => {
//   const { getdeliveryguyid } = req.deliveryguy

//   try {
//     // const orderDetails = await pool.query(`SELECT * from`)

//     res.status(200).json({msg:'working on sending the order details'})
//   } catch (err) {
//     return res.status(500).json({ msg: 'Some error occured' })
//   }
// }

module.exports = {
  registerDeliveryGuy,
  loginDeliveryGuy,
  getCurrentDeliveryGuy
  // onProcessOrderDelivery
}
