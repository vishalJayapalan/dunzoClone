require('dotenv').config()
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { pool } = require('../util/database')

const registerUser = async (req, res) => {
  let { fullname, email, password } = req.body
  if (!fullname || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields ' })
  }

  try {
    const duplicateUser = await pool.query(
      `SELECT * FROM users where email='${email}'`
    )
    if (!duplicateUser.rowCount) {
      password = await bcrypt.hash(password, 10)
      const newUser = await pool.query(
        `INSERT INTO users (fullname,email,password) VALUES ('${fullname}','${email}','${password}') RETURNING *`
      )
      const accessToken = jwt.sign(
        { userid: newUser.rows[0].userid },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 }
      )
      return res
        .status(201)
        .cookie('x-auth-token', accessToken, { maxAge: 3600000 })
        .json({ userid: newUser.rows[0].userid, accessToken })
    }
    return res.status(400).json({ msg: 'Email already exists' })
  } catch (err) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  // console.log('cookie', req.headers)
  if (!email || !password)
    return res.status(200).json({ msg: 'Please Enter all fields' })
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email='${email}'`)
    if (!user.rowCount) {
      return res.status(400).json({ msg: 'your email or password is wrong' })
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'your email or password is wrong' })
    }
    console.log(user.rows[0])
    const accessToken = jwt.sign(
      { userid: user.rows[0].userid },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 3600 }
    )
    return (
      res
        .status(200)
        .cookie('x-auth-token', accessToken, { maxAge: 3600000 })
        // .header('Access-Control-Allow-Origin', 'http://localhost:3000/')
        // .header('Access-Control-Allow-Credentials', 'true')
        .json({
          userid: user.rows[0].userid,
          fullname: user.rows[0].fullname,
          accessToken
        })
    )
  } catch (err) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
}
const getCurrentUser = async (req, res) => {
  // const userId = req.params.userid
  const { userid } = req.user
  try {
    const user = await pool.query(
      `SELECT userid, fullname FROM users WHERE userid = ${userid}`
    )

    if (!user.rowCount) {
      return res.status(400).json({ message: 'User not found' })
    }
    console.log(user.rows[0])
    return res.status(200).json({
      userid: user.rows[0].userid,
      fullname: user.rows[0].fullname
    })
  } catch (err) {
    return res.status(500).json({ message: "Can't find User" })
  }
}
module.exports = { registerUser, loginUser, getCurrentUser }
