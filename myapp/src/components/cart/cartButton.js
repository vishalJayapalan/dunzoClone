import React, { useContext } from 'react'

import { UserContext } from '../context/user/UserContext'

export default function CartButton (props) {
  const { updateCart } = useContext(UserContext)

  return (
    <div>
      <div className='cart-buttons-container'>
        <button className='minus' onClick={() => updateCart(props.inCart, '-')}>
          -
        </button>
        <div>{props.inCart.item_quantity}</div>
        <button className='plus' onClick={() => updateCart(props.inCart, '+')}>
          +
        </button>
      </div>
    </div>
  )
}
