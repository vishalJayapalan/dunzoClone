import React from 'react'

import CartButton from './cartButton'

export default function cartItem (props) {
  return (
    <div className='cart-item-container'>
      <div className='cart-item-description'>
        <p>{props.cartItem.name}</p>
        <p>{props.cartItem.description}</p>
      </div>
      <CartButton inCart={props.cartItem} /> {/* can removeupdateCart */}
      <p>₹ {(props.cartItem.price * props.cartItem.quantity).toFixed(2)}</p>
    </div>
  )
}
