import React from 'react'
import UserAddress from '../userAddress/userAddress'

export default function ({
  setAddNewAddress,
  userAddresses,
  setAddressSelected,
  fromProfile
}) {
  console.log(userAddresses)
  return (
    <div className='addresses-container'>
      <div
        className='add-new-address-container'
        onClick={() => setAddNewAddress(true)}
      >
        <p>
          <span>+</span> Add new Address
        </p>
      </div>
      {userAddresses.map(userAddress => (
        <UserAddress
          key={userAddress.addressid}
          userAddress={userAddress}
          setAddressSelected={setAddressSelected}
          fromProfile={fromProfile}
        />
      ))}
    </div>
  )
}
