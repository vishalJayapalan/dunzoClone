import React, { useContext } from 'react'

import { UserContext } from '../context/user/UserContext'

export default function ClearCartPopup () {
  const { setClearCartPopup, deleteAllItemsFromCart } = useContext(UserContext)
  return (
    <div className='overlay'>
      <div className='clear-cart-popup-container'>
        <div className='clear-cart-title-container'>
          <h3>Clear cart?</h3>
          <p>
            Your cart Contains items from different shop.Do you want to clear
            the cart and add items from this shop
          </p>
        </div>
        <div className='clear-cart-buttons-container'>
          <button className='cancel' onClick={() => setClearCartPopup(false)}>
            Cancel
          </button>
          <button
            className='clear-cart'
            onClick={() => {
              deleteAllItemsFromCart()
              setClearCartPopup(false)
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}
