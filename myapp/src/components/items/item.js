import React, { useState, useContext } from 'react'

import { AppContext } from '../context/App/AppContext'

import CartButton from './cartButton'

export default function Item (props) {
  const { cart, addToCart, updateCart, setClearCartPopup } = useContext(
    AppContext
  )
  let inCart = null
  cart.forEach(cartItem => {
    if (cartItem.itemid === props.item.itemid) {
      inCart = cartItem
    }
  })
  return (
    <div className='item-container'>
      <div className='item-image-container'>
        <img src='/images/groceries.jpeg' className='item-image'></img>
      </div>
      <div className='item-name-container'>
        <p className='item-name'>{props.item.itemname}</p>
        <p>₹ {props.item.itemprice}</p>
        <p>{props.item.itemsize}</p>
      </div>
      <div className='item-button-container'>
        {inCart ? (
          <CartButton inCart={inCart} />
        ) : (
          <button
            className='item-button-add'
            onClick={() => {
              if (cart.length && cart[0].shopname !== props.shopname) {
                return setClearCartPopup(true)
              }
              addToCart(props.item, props.shopname)
            }}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  )
}
