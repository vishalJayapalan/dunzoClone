require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
  checkUserFromDb,
  createUserInDb,
  getCurrentUserFromDb
} = require('./model')

const registerUser = async (req, res) => {
  let { fullname, email, password } = req.body
  if (!fullname || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields ' })
  }

  try {
    const { user, error } = await checkUserFromDb(email)
    if (error) {
      throw error
    }
    if (!user.rowCount) {
      password = await bcrypt.hash(password, 10)
      const { newUser, error } = await createUserInDb(fullname, email, password)

      if (error) throw error
      const accessToken = jwt.sign(
        { id: newUser[0].id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 }
      )
      return res
        .status(201)
        .cookie('x-auth-token', accessToken, { maxAge: 3600000 })
        .json(newUser)
    }
    return res.status(400).json({ msg: 'Email already exists' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Some error occured' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(200).json({ msg: 'Please Enter all fields' })
  }
  try {
    const { user, error } = await checkUserFromDb(email)
    if (error) throw error
    if (!user.rowCount) {
      return res.status(400).json({ msg: 'your email or password is wrong' })
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'your email or password is wrong' })
    }
    const accessToken = jwt.sign(
      { id: user.rows[0].id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 3600 }
    )
    return res
      .status(200)
      .cookie('x-auth-token', accessToken, { maxAge: 3600000 })
      .json(user.rows)
  } catch (err) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
}

const getCurrentUser = async (req, res) => {
  if (!req.user) return res.status(400).json({ message: 'User not found' })

  const userId = req.user.id
  try {
    const { currentUser, error } = await getCurrentUserFromDb(userId)
    if (!currentUser.rowCount) {
      return res.status(400).json({ message: 'User not found' })
    }
    return res.status(200).json(currentUser.rows)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Can't find User" })
  }
}

module.exports = { registerUser, loginUser, getCurrentUser }
