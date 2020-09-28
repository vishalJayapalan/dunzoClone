import React from 'react'

export default function UserAddress ({ userAddress, setAddressSelected }) {
  return (
    <div
      className='address-container'
      onClick={() => setAddressSelected(userAddress.address)}
    >
      <h2>{userAddress.category}</h2>
      <p>{userAddress.address}</p>
    </div>
  )
}
