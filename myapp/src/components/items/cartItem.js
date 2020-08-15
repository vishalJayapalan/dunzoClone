import React from 'react'

import CartButton from './cartButton'

export default function cartItem (props) {
  //   let inCart = null
  //   props.cart.forEach(cartItem => {
  //     if (cartItem.itemid === props.item.itemid) {
  //       inCart = cartItem
  //     }
  //   })
  return (
    <div className='cart-item-container'>
      <div className='cart-item-description'>
        <p>{props.cartItem.itemname}</p>
        <p>{props.cartItem.itemsize}</p>
      </div>
      <CartButton
        inCart={props.cartItem}
        cartQuantityUpdate={props.cartQuantityUpdate}
      />
      <p>
        ₹{' '}
        {(props.cartItem.itemprice * props.cartItem.cartitemquantity).toFixed(
          2
        )}
      </p>
    </div>
  )
}
