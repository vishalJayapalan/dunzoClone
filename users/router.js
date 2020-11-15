const Router = require('express').Router()
const auth = require('../middleware/auth')

const { registerUser, loginUser, getCurrentUser } = require('./model')

Router.post('/', registerUser)

Router.post('/login', loginUser)

Router.get('/getUser', auth, getCurrentUser)

module.exports = Router
