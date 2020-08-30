import React, { useContext } from 'react'

import { AppContext } from '../context/App/AppContext'

export default function CartButton (props) {
  const { updateCart } = useContext(AppContext)

  return (
    <div>
      <div className='cart-buttons-container'>
        <button className='minus' onClick={() => updateCart(props.inCart, '-')}>
          -
        </button>
        <div>{props.inCart.cartitemquantity}</div>
        <button className='plus' onClick={() => updateCart(props.inCart, '+')}>
          +
        </button>
      </div>
    </div>
  )
}
