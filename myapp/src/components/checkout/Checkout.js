import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../navbar/Navbar'
import './Checkout.css'

import Cart from '../items/cart'
import Invoice from '../items/invoice.js'
import { AppContext } from '../context/App/AppContext'

import io from 'socket.io-client'
let socket

export default function Checkout () {
  const {
    showLogin,
    showRegister,
    setShowLogin,
    isLoggedIn,
    setIsLoggedIn,
    deliveryAddress,
    setDeliveryAddress
  } = useContext(AppContext)
  const endpoint = 'http://localhost:5000'
  return (
    <div className='checkout-page'>
      <Navbar />
      <div className='checkout-container'>
        <div className='checkout-signin-deliveryaddress-paybtn'>
          {!isLoggedIn && (
            <div className='checkout-signin-container'>
              <div className='checkout-signin-inner-container'>
                <h2 className='checkout-signin-title'>
                  Sign in to place your order
                </h2>
                <p className='checkout-signin-info'>
                  New to dunzoClone? Signup/Signin to get started
                </p>
                <button
                  className='checkout-signinBtn'
                  onClick={() => {
                    setShowLogin(true)
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          <div className='checkout-delivery-address-container' disabled={true}>
            <div className='checkout-delivery-address-inner-container'>
              <h2 className='checkout-address-title'>Add delivery address</h2>
              <input
                className='checkout-address-input'
                placeholder='Enter the delivery address'
                disabled={!isLoggedIn}
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
              />
            </div>
          </div>
          <Link
            style={{ textDecoration: 'none' }}
            to={{
              pathname: `/track-order`,
              aboutProps: { name: 'test information' }
            }}
          >
            <button className='paybtn'>Pay</button>
          </Link>
        </div>
        <div className='checkout-cart-invoice-container'>
          <div className='checkout-cart-container'>
            <Cart showToCheckout={false} />
          </div>
          <div className='checkout-invoice-container'>
            <Invoice />
          </div>
        </div>
      </div>
    </div>
  )
}
