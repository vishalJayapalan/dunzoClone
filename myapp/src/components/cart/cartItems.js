import React, { useContext } from 'react'

import { AppContext } from '../context/App/AppContext'
import CartItem from './cartItem'

export default function CartItems () {
  const { cart } = useContext(AppContext)
  return (
    <div className='cart-items-container'>
      {cart.map(cartItem => (
        <CartItem key={cartItem.cartid} cartItem={cartItem} />
      ))}
    </div>
  )
}
