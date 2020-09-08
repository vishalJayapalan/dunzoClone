import React, { useContext, useState } from 'react'
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
  const [addressSelected, setAddressSelected] = useState(false)
  const endpoint = 'http://localhost:5000'
  return (
    <div className='checkout-page'>
      <Navbar hideLoginAndLogout={true} />
      <div className='checkout-container'>
        <div className='checkout-signin-deliveryaddress-paybtn'>
          {/* LOGIN SECTION */}
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

          {/* ADDRESS SECTION */}

          <div className='checkout-delivery-address-container' disabled={true}>
            <div className='checkout-delivery-address-title-container'>
              <h2 className='checkout-address-title'>Add delivery address</h2>
              <p className='address-description'>
                Choose your delivery address from address book or add new
              </p>
            </div>
            {isLoggedIn && !addressSelected && (
              <div className='addresses-container'>
                <div className='add-new-address-container'>
                  <p>
                    <span>+</span> Add new Address
                  </p>
                </div>
                <div
                  className='address-container'
                  onClick={() => setAddressSelected(true)}
                >
                  <h2>Home</h2>
                  <p>kannur,kerala</p>
                </div>
              </div>
            )}
            {addressSelected && (
              <div className='selected-address'>
                <h2>Home</h2>
                <p>kannur,kerala</p>
              </div>
            )}
            {/* <input
                className='checkout-address-input'
                placeholder='Enter the delivery address'
                disabled={!isLoggedIn}
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
              /> */}
          </div>

          {/* PAYING SECTION */}
          <Link
            style={{ textDecoration: 'none' }}
            to={{
              pathname: `/track-order`,
              aboutProps: { name: 'test information' }
            }}
          >
            <button
              className='paybtn'
              disabled={!addressSelected}
              style={
                !addressSelected
                  ? { backgroundColor: 'grey' }
                  : { backgroundColor: 'green' }
              }
            >
              Pay
            </button>
          </Link>
        </div>

        {/* CART SECTION */}
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
