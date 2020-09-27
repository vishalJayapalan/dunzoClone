const router = require('express').Router()

const auth = require('../middleware/auth')

const {
  getUserAddress,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
} = require('./userAddressModel')

router.get('/:userid', auth, getUserAddress)

router.post('/:userid', auth, addUserAddress)

router.put('/:addressid', updateUserAddress)

router.delete('/:addressid', deleteUserAddress)

module.exports = router
