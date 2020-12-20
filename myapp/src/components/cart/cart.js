import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

import CartItems from './cartItems'

import { AppContext } from '../context/App/AppContext'

export default function Cart (props) {
  const { cart } = useContext(AppContext)
  let totalPrice = 0
  cart.forEach(cartItem => {
    totalPrice += cartItem.itemprice * cartItem.cartitemquantity
  })

  return (
    <div className='cart-container'>
      <div className='cart-title-container'>
        <h3 className='cart-title'>Your Cart</h3>
        {cart.length !== 0 && (
          <span className='cart-items-count'>({cart.length} Items)</span>
        )}
      </div>
      {!cart.length ? (
        <div className='nocart-container'>
          <img
            className='nocart-image'
            src='/images/noCartImg.png'
            alt='**{Eeshvara}**'
          />
          <p>Your cart is empty </p>
          <p>Add items to get started</p>
        </div>
      ) : (
        <div className='cart-shopname'>{cart[0].shopname}</div>
      )}
      <CartItems />
      {cart.length !== 0 && (
        <div className='cart-totalprice-container'>
          <span>Item Total</span>
          <span>₹ {totalPrice.toFixed(2)} </span>
        </div>
      )}
      {cart.length !== 0 && props.showToCheckout && (
        <div className='checkout-button-container'>
          <Link
            className='proceed-to-checkout-btn'
            to={{ pathname: `/checkout/${cart[0].shopid}`, state: 'test' }}
          >
            Proceed To Checkout
          </Link>
        </div>
      )}
    </div>
  )
}
