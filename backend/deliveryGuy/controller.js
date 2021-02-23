require('dotenv').config()
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const {
  getDeliveryGuyFromDb,
  registerNewDeliveryGuy,
  getCurrentDeliveryGuyFromDb
} = require('./model')

const registerDeliveryGuy = async (req, res) => {
  let { name, email, password } = req.body
  // console.log(name, email, password)
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all the fields' })
  }
  const { deliveryGuy, error } = await getDeliveryGuyFromDb(email)
  if (error) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
  if (!deliveryGuy.rowCount) {
    password = await bcrypt.hash(password, 10)
    const { newDeliveryGuy, error } = await registerNewDeliveryGuy(
      name,
      email,
      password
    )
    if (error) {
      return res.status(500).json({ msg: 'Some error occured' })
    }
    const accessToken = jwt.sign(
      { id: newDeliveryGuy[0].id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 3600 }
    )
    return res
      .status(201)
      .cookie('deliveryguy-token', accessToken, { maxAge: 3600000 })
      .json({
        id: newDeliveryGuy[0].id,
        accessToken
      })
  }
  return res.status(400).json({ msg: 'Email already exists' })
}

const loginDeliveryGuy = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(200).json({ msg: 'Please Enter all fields' })
  const { deliveryGuy, error } = await getDeliveryGuyFromDb(email)
  if (error) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
  if (!deliveryGuy.rowCount) {
    return res.status(400).json({ msg: 'your email or password is wrong' })
  }
  const isMatch = await bcrypt.compare(password, deliveryGuy.rows[0].password)
  if (!isMatch) {
    return res.status(400).json({ msg: 'your email or password is wrong' })
  }
  const accessToken = jwt.sign(
    { id: deliveryGuy.rows[0].id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 3600 }
  )
  // console.log(deliveryGuy.rows)
  return res
    .status(200)
    .cookie('deliveryguy-token', accessToken, { maxAge: 3600000 })
    .json({
      id: deliveryGuy.rows[0].id,
      accessToken
    })
}

const getCurrentDeliveryGuy = async (req, res) => {
  const { deliveryguyid } = req.deliveryguy
  if (!deliveryguyid) res.status(401).json({ message: 'not authenticated' })

  const { currentDeliveryGuy, error } = await getCurrentDeliveryGuyFromDb(
    deliveryguyid
  )
  if (error) {
    return res.status(500).json({ msg: 'Some error occured' })
  }
  if (!deliveryGuy.rowCount) {
    return res.status(400).json({ message: 'User not found' })
  }
  return res.status(200).json({
    deliveryguyid: currentDeliveryGuy.rows[0].deliveryguyid,
    deliveryguyname: currentDeliveryGuy.rows[0].deliveryguyname
  })
}

module.exports = {
  registerDeliveryGuy,
  loginDeliveryGuy,
  getCurrentDeliveryGuy
}
