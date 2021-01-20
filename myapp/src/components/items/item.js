import React, { useContext } from 'react'

import { UserContext } from '../context/user/UserContext'

import CartButton from '../cart/cartButton'

export default function Item (props) {
  const { cart, addToCart, setClearCartPopup } = useContext(UserContext)
  // console.log(props.item)
  let inCart = null
  cart.forEach(cartItem => {
    if (cartItem.itemid === props.item.itemid) {
      inCart = cartItem
    }
  })
  return (
    <div
      className={`item-container ${props.item.quantity == 0 ? 'disabled' : ''}`}
    >
      <div className='item-image-container'>
        <img
          src='/images/groceries.jpeg'
          alt='item'
          className='item-image'
        ></img>
      </div>
      <div className='item-name-container'>
        <p className='item-name'>{props.item.itemname}</p>
        <p>₹ {props.item.itemprice}</p>
        <p>{props.item.itemsize}</p>
        {props.item.quantity < 5 && props.item.quantity != 0 && (
          <p className='few-indicator'>Only few items left</p>
        )}
      </div>
      <div className='item-button-container'>
        {props.item.quantity == 0 ? (
          <span className='msg-unavailable'>Unavailable</span>
        ) : inCart ? (
          <CartButton inCart={inCart} />
        ) : (
          <button
            className={`item-button-add`}
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
