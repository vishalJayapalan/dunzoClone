import React from 'react'

export default function CartButton (props) {
  console.log(props)
  return (
    <div>
      <div className='cart-buttons-container'>
        <button
          className='minus'
          onClick={() => props.cartQuantityUpdate(props.inCart, '-')}
        >
          -
        </button>
        <div>{props.inCart.cartitemquantity}</div>
        <button
          className='plus'
          onClick={() => props.cartQuantityUpdate(props.inCart, '+')}
        >
          +
        </button>
      </div>
    </div>
  )
}
