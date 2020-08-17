import React, { useState, useContext } from 'react'

// import { AppContext } from '../context/AppContext'

import CartButton from './cartButton'

export default function Item (props) {
  // const { cart, addToCart, updateCart } = useContext(AppContext)
  let inCart = null
  props.cart.forEach(cartItem => {
    if (cartItem.itemid === props.item.itemid) {
      inCart = cartItem
    }
  })
  return (
    <div className='item-container'>
      <div className='item-image-container'></div>
      <div className='item-name-container'>
        <p className='item-name'>{props.item.itemname}</p>
        <p>₹ {props.item.itemprice}</p>
        <p>{props.item.itemsize}</p>
      </div>
      <div className='item-button-container'>
        {inCart ? (
          <CartButton inCart={inCart} updateCart={props.updateCart} />
        ) : (
          <button
            className='item-button-add'
            onClick={() => props.addToCart(props.item, props.shopname)}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  )
}
