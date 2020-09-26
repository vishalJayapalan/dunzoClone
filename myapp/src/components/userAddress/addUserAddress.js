import React, { useState } from 'react'

import Nominatim from 'nominatim-geocoder'

import './userAddress.css'

import SearchUserAddressItems from './searchUserAddressItems'

export default function AddUserAddress () {
  const [newAddress, setNewAddress] = useState('')
  const searchItems = []

  const geocoding = async address => {
    const geocoder = new Nominatim()

    const latlong = await geocoder.search({ q: address })
    console.log('latlong', latlong)
  }

  if (newAddress.length > 2) {
    console.log(typeof newAddress)
    geocoding(newAddress)
  }

  return (
    <div>
      <div className='overlay'>
        <div className='add-address-container'>
          <div className='search-drop-location-container'>
            <div className='search-drop-location-title-container'>
              <h3>Search Drop Location</h3>
              <img
                src='/images/closeIcon.png'
                // onClick={() => setShowLogin(false)}
              />
            </div>
            <input
              type='text'
              placeholder='Enter the address'
              value={newAddress}
              onChange={event => setNewAddress(event.target.value)}
            />
          </div>
          <div className='searched-addresses-container'>
            {searchItems.length ? (
              <SearchUserAddressItems />
            ) : (
              <img
                className='waiting-image'
                src='/images/searchUserAddressImage.png'
              ></img>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
