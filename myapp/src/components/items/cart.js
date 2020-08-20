import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

import CartItem from './cartItem'

import { AppContext } from '../context/AppContext'

export default function Cart (props) {
  const { cart, updateCart } = useContext(AppContext)

  let totalPrice = 0
  cart.forEach(element => {
    totalPrice += element.itemprice * element.cartitemquantity
  })
  return (
    <div className='cart-container'>
      <div className='cart-title-container'>
        <h3>Your Cart</h3>
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
      {cart.length !== 0 && <div>{cart[0].shopname}</div>}
      <div className='cart-items-container'>
        {cart.map(cartItem => (
          <CartItem
            key={cartItem.cartid}
            cartItem={cartItem}
            // cart={props.cart}
          />
        ))}
      </div>
      {cart.length !== 0 && (
        <div className='cart-totalprice-container'>
          <span>Item Total</span>
          <span>₹ {totalPrice.toFixed(2)} </span>
        </div>
      )}
      {cart.length !== 0 && (
        <div className='checkout-button-container'>
          <Link to='/checkout'>
            <button>Proceed To Checkout</button>
          </Link>
        </div>
      )}
    </div>
  )
}
