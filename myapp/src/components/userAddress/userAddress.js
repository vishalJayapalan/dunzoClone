import React from 'react'

export default function UserAddress ({
  userAddress,
  setAddressSelected,
  fromProfile,
  deleteUserAddress
}) {
  // function deleteUserAddress () {}
  // console.log(userAddress)
  return (
    <div
      className='address-container'
      onClick={() => !fromProfile && setAddressSelected(userAddress.address)}
    >
      <h2>{userAddress.category}</h2>
      <p>{userAddress.address}</p>
      {fromProfile && (
        <button
          onClick={() => deleteUserAddress(userAddress.id)}
          className='delete-address'
        >
          Delete
        </button>
      )}
    </div>
  )
}
