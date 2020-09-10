import React from 'react'

export default function clearCartPopup () {
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
          <button>Cancel</button>
          <button>Clear Cart</button>
        </div>
      </div>
    </div>
  )
}
