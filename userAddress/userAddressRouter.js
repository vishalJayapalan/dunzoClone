const router = require('express').Router()

const {
  getUserAddress,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
} = require('./userAddressModel')

router.get('/:userid', getUserAddress)

router.post('/:userid', addUserAddress)

router.put('/:addressid', updateUserAddress)

router.delete('/:addressid', deleteUserAddress)

module.exports = router
