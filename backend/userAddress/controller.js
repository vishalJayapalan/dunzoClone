const {
  getUserAddressFromDb,
  addUserAddressInDb,
  updateUserAddressInDb,
  deleteUserAddressInDb
} = require('./model')

const getUserAddress = async (req, res) => {
  if (!req.user) return res.status(404).json({ Msg: 'Not Authenticated' })
  const userId = req.user.id
  const { userAddress, error } = await getUserAddressFromDb(userId)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).send(userAddress)
}

const addUserAddress = async (req, res) => {
  const { address, category } = req.body
  const userId = req.user.id
  const { userAddress, error } = await addUserAddressInDb(
    address,
    userId,
    category
  )
  if (error) {
    return res.status(500).json({ Msg: err })
  }
  res.status(201).send(userAddress)
}

const updateUserAddress = async (req, res) => {
  let { address } = req.body
  const { addressid } = req.params
  const { updatedUserAddress, error } = await updateUserAddressInDb(
    address,
    addressid
  )
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).send(updatedUserAddress)
}

const deleteUserAddress = async (req, res) => {
  const { addressid } = req.params
  const { deletedUserAddress, error } = await deleteUserAddressInDb(addressid)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).send(deletedUserAddress)
}

module.exports = {
  getUserAddress,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
}
