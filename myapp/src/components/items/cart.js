import React, { useContext } from 'react'

import CartItem from './cartItem'

// import { AppContext } from '../context/AppContext'

export default function Cart (props) {
  // const { cart, updateCart } = useContext(AppContext)

  let totalPrice = 0
  props.cart.forEach(element => {
    totalPrice += element.itemprice * element.cartitemquantity
  })
  return (
    <div className='cart-container'>
      <div className='cart-title-container'>
        <h3>Your Cart</h3>
        {props.cart.length !== 0 && (
          <span className='cart-items-count'>({props.cart.length} Items)</span>
        )}
      </div>
      {props.cart.length === 0 && (
        <div className='nocart-container'>
          <img
            className='nocart-image'
            src='/images/noCartImg.png'
            alt='**{Eeshvara}**'
          />
          <p>Your cart is empty </p>
          <p>Add items to get started</p>
        </div>
      )}
      {props.cart.length !== 0 && <div>{props.cart[0].shopname}</div>}
      <div className='cart-items-container'>
        {props.cart.map(cartItem => (
          <CartItem
            key={cartItem.cartid}
            cartItem={cartItem}
            // cart={props.cart}
            updateCart={props.updateCart}
          />
        ))}
      </div>
      {props.cart.length !== 0 && (
        <div className='cart-totalprice-container'>
          <span>Item Total</span>
          <span>₹ {totalPrice.toFixed(2)} </span>
        </div>
      )}
      {props.cart.length !== 0 && (
        <div className='checkout-button-container'>
          <button>Proceed To Checkout</button>
        </div>
      )}
    </div>
  )
}
