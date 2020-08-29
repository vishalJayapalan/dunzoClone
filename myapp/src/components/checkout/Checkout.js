import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../navbar/Navbar'
import './Checkout.css'

import Cart from '../items/cart'

export default function Checkout () {
  return (
    <div className='checkout-page'>
      <Navbar />
      <div className='checkout-container'>
        <div className='checkout-signin-deliveryaddress-paybtn'>
          <div className='checkout-signin-container'>
            <div className='checkout-signin-inner-container'>
              <h2 className='checkout-signin-title'>
                Sign in to place your order
              </h2>
              <p className='checkout-signin-info'>
                New to dunzoClone? Signup/Signin to get started
              </p>
              <button className='checkout-signinBtn'>Sign In</button>
            </div>
          </div>

          <div className='checkout-delivery-address-container' disabled={true}>
            <div className='checkout-delivery-address-inner-container'>
              <h2 className='checkout-address-title'>Add delivery address</h2>
              <input
                className='checkout-address-input'
                placeholder='Enter the delivery address'
                disabled={true}
              />
            </div>
          </div>
          <Link style={{ textDecoration: 'none' }} to={`/track-order`}>
            <button className='paybtn'>Pay</button>
          </Link>
        </div>
        <div className='checkout-cart-invoice'>
          <div className='cart-container'>
            <Cart showToCheckout={false} />
          </div>
        </div>
      </div>
    </div>
  )
}
