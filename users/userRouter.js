const Router = require('express').Router()

const { registerUser, loginUser, getCurrentUser } = require('./userModel')

Router.post('/', registerUser)

Router.post('/login', loginUser)

Router.get('/:userid', getCurrentUser)

module.exports = Router
