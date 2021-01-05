import React, { useContext } from 'react'

import { UserContext } from '../context/user/UserContext'
import CartItem from './cartItem'

export default function CartItems () {
  const { cart } = useContext(UserContext)
  return (
    <div className='cart-items-container'>
      {cart.map(cartItem => (
        <CartItem key={cartItem.cartid} cartItem={cartItem} />
      ))}
    </div>
  )
}
