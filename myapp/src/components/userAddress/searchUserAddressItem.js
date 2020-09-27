import React from 'react'

export default function SearchUserAddressItems ({
  address,
  addNewUserAddress
}) {
  return (
    <div>
      <p
        className='searched-address'
        onClick={() => addNewUserAddress(address.display_name)}
      >
        {address.display_name}
      </p>
    </div>
  )
}
