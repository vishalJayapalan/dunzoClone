import React, { useContext } from 'react'

import { UserContext } from '../context/user/UserContext'

import CartButton from '../cart/cartButton'

export default function Item ({ item, shopName }) {
  const { cart, addToCart, setClearCartPopup } = useContext(UserContext)
  let inCart = null
  cart.forEach(cartItem => {
    if (cartItem.item_id === item.id) {
      inCart = cartItem
    }
  })
  return (
    <div className={`item-container ${item.quantity == 0 ? 'disabled' : ''}`}>
      <div className='item-image-container'>
        <img
          src='/images/groceries.jpeg'
          alt='item'
          className='item-image'
        ></img>
      </div>
      <div className='item-name-container'>
        <p className='item-name'>{item.name}</p>
        <p>₹ {item.price}</p>
        <p>{item.description}</p>
        {item.quantity < 5 && item.quantity != 0 && (
          <p className='few-indicator'>Only few items left</p>
        )}
      </div>
      <div className='item-button-container'>
        {item.quantity == 0 ? (
          <span className='msg-unavailable'>Unavailable</span>
        ) : inCart ? (
          <CartButton inCart={inCart} />
        ) : (
          <button
            className={`item-button-add`}
            onClick={() => {
              if (cart.length && cart[0].shop_name !== shopName) {
                return setClearCartPopup(true)
              }
              addToCart(item, shopName)
            }}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  )
}
