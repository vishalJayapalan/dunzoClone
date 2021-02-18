const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  // let accessToken
  // const cookieHeaderString = req.headers.cookie
  // console.log('middleware', req.headers)
  // if (cookieHeaderString) {
  //   const cookies = cookieHeaderString.split(';')
  //   for (const cookie of cookies) {
  //     const [key, value] = cookie.split('=')
  //     if (key === 'x-auth-token') {
  //       accessToken = value
  //       break
  //     }
  //   }
  // }
  const accessToken =
    req.headers['x-auth-token'] || req.headers['authorization']
  try {
    if (!accessToken) {
      res.user = null
      next()
    } else {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      req.user = decoded
      // console.log('reqBody', req.body)
      // console.log('inAUth', req.user)
      next()
    }
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}
