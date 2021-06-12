import React from 'react'

import CartButton from './cartButton'

export default function cartItem ({cartItem}) {
  return (
    <div className='cart-item-container'>
      <div className='cart-item-description'>
        <p>{cartItem.name}</p>
        <p>{cartItem.description}</p>
      </div>
      <CartButton inCart={cartItem} /> {/* can removeupdateCart */}
      <p>₹ {(cartItem.price * cartItem.item_quantity).toFixed(2)}</p>
    </div>
  )
}
