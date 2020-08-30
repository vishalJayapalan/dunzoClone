require('dotenv').config()
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { pool } = require('../util/database')

const registerUser = async (req, res) => {
  let { fullname, email, password } = req.body
  console.log(fullname, email, password)
  if (!fullname || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields ' })
  }

  try {
    const duplicateUser = await pool.query(
      `SELECT * FROM users where email='${email}'`
    )
    if (!duplicateUser.rowCount) {
      console.log(password)

      password = await bcrypt.hash(password, 10)
      console.log(password)
      const newUser = await pool.query(
        `INSERT INTO users (fullname,email,password) VALUES ('${fullname}','${email}','${password}') RETURNING *`
      )
      console.log(newUser.rows[0])
      const accessToken = jwt.sign(
        { userid: newUser.rows[0].userid },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 }
      )
      console.log('token', accessToken)
      return res
        .status(201)
        .cookie('x-auth-token', accessToken, { maxAge: 3600000 })
        .json(newUser.rows[0].userid)
    }
    return res.status(400).json({ msg: 'Email already exists' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Some error occured' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  console.log('cookie', req.headers)
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
    const accessToken = jwt.sign(
      { userid: user.rows[0].userid },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 3600 }
    )
    return res
      .status(201)
      .cookie('x-auth-token', accessToken, { maxAge: 3600000 })
      .json(user.rows[0].userid)
    // .setHeader('Set-Cookie', [`x-auth-token=${accessToken}`])
  } catch (err) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
}
const getCurrentUser = async (req, res) => {
  const userId = req.params.userid

  try {
    const user = await pool.query(
      `SELECT userid, fullname FROM users WHERE userid = ${userId}`
    )

    if (!user.rowCount) {
      return res.status(400).json({ message: 'User not found' })
    }

    return res.status(200).json(user.rows[0])
  } catch (err) {
    return res.status(500).json({ message: "Can't find User" })
  }
}
module.exports = { registerUser, loginUser, getCurrentUser }
