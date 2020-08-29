import React, { useContext } from 'react'

import { AppContext } from '../context/AppContext'
import CartItem from './cartItem'

export default function CartItems () {
  const { cart } = useContext(AppContext)
  return (
    <div>
      <div className='cart-items-container'>
        {cart.map(cartItem => (
          <CartItem
            key={cartItem.cartid}
            cartItem={cartItem}
            // cart={props.cart}
          />
        ))}
      </div>
    </div>
  )
}