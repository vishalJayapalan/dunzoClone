import React, { useState } from 'react'

import Nominatim from 'nominatim-geocoder'

import './userAddress.css'

import SearchUserAddressItem from './searchUserAddressItem'

export default function AddUserAddress ({
  setAddNewAddress,
  addNewUserAddress
}) {
  const [newAddress, setNewAddress] = useState('')
  const [searchItems, setSearchItems] = useState([])

  const geocoding = async address => {
    const geocoder = new Nominatim()

    const latlong = await geocoder.search({ q: address })
    setSearchItems(
      latlong.map(address => (
        <SearchUserAddressItem
          key={address.osm_id}
          address={address}
          addNewUserAddress={addNewUserAddress}
        />
      ))
    )
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
                onClick={() => setAddNewAddress(false)}
              />
            </div>
            <input
              className='user-address-input'
              type='text'
              placeholder='Enter the address'
              value={newAddress}
              onKeyDown={event => {
                if (event.keyCode === 13) {
                  geocoding(newAddress)
                }
                // console.log(event.keyCode)
              }}
              onChange={event => {
                if (event.keycode !== 13) setNewAddress(event.target.value)
              }}
            />
          </div>
          <div className='searched-addresses-container'>
            {searchItems.length ? (
              searchItems
            ) : (
              <img
                className='waiting-image'
                src='/images/searchUserAddressImage.png'
              ></img>
            )}
            {/* {searchItems} */}
          </div>
        </div>
      </div>
    </div>
  )
}
