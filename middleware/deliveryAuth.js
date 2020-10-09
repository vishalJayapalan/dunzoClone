const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const accessToken =
    req.headers['deliveryguy-token']
  try {
    if (!accessToken) {
      req.deliveryguy = null
      next()
    } else {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      console.log('deliveryguy',decoded)
      req.deliveryguy = decoded
      // console.log('reqBody', req.body)
      // console.log('inAUth', req.user)
      next()
    }
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}
