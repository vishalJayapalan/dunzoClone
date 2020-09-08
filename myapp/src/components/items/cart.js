import React, { useContext, useEffect } from 'react'

import { Link } from 'react-router-dom'

import CartItems from './cartItems'

import { AppContext } from '../context/App/AppContext'

export default function Cart (props) {
  const { cart, getCart } = useContext(AppContext)
  useEffect(() => {
    getCart()
  }, [])

  let totalPrice = 0
  cart.forEach(element => {
    totalPrice += element.itemprice * element.cartitemquantity
  })
  return (
    <div className='cart-container'>
      <div className='cart-title-container'>
        <h3 className='cart-title'>Your Cart</h3>
        {cart.length !== 0 && (
          <span className='cart-items-count'>({cart.length} Items)</span>
        )}
      </div>
      {cart.length === 0 && (
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
      {cart.length !== 0 && (
        <div className='cart-shopname'>{cart[0].shopname}</div>
      )}
      <CartItems />
      {/* <div className='cart-items-container'>
        {cart.map(cartItem => (
          <CartItem
            key={cartItem.cartid}
            cartItem={cartItem}
            // cart={props.cart}
          />
        ))}
      </div> */}
      {cart.length !== 0 && (
        <div className='cart-totalprice-container'>
          <span>Item Total</span>
          <span>₹ {totalPrice.toFixed(2)} </span>
        </div>
      )}
      {cart.length !== 0 && props.showToCheckout && (
        <div className='checkout-button-container'>
          <Link to='/checkout'>
            <button style={{ cursor: 'pointer' }}>Proceed To Checkout</button>
          </Link>
        </div>
      )}
    </div>
  )
}
