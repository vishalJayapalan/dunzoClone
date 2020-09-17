import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getCookie } from '../util/cookies'

import Navbar from '../navbar/Navbar'
import './Checkout.css'

import Cart from '../items/cart'
import Invoice from '../items/invoice.js'
import { AppContext } from '../context/App/AppContext'

import UserAddress from '../userAddress/userAddress'

export default function Checkout () {
  const {
    showLogin,
    showRegister,
    setShowLogin,
    isLoggedIn,
    setIsLoggedIn,
    deliveryAddress,
    setDeliveryAddress,
    deleteAllItemsFromCart,
    cart
  } = useContext(AppContext)
  const [addressSelected, setAddressSelected] = useState(false)

  const [userAddresses, setUserAddresses] = useState([])

  const getUserAddress = async () => {
    const data = await window.fetch(
      `http://localhost:5000/userAddress/${isLoggedIn}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    if (data.ok) {
      const jsonData = await data.json()
      setUserAddresses(jsonData)
    }
  }

  useEffect(() => {
    getUserAddress()
  }, [isLoggedIn])

  return (
    <div className='checkout-page'>
      <Navbar />
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
                {userAddresses.map(userAddress => (
                  <UserAddress
                    key={userAddress.addressid}
                    userAddress={userAddress}
                    setAddressSelected={setAddressSelected}
                  />
                ))}
              </div>
            )}
            {addressSelected && (
              <div className='selected-address'>
                <h2>Home</h2>
                <p>kannur,kerala</p>
              </div>
            )}
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
              disabled={!(addressSelected && isLoggedIn && cart.length)}
              onClick={() => {
                deleteAllItemsFromCart()
              }}
              style={
                !(addressSelected && isLoggedIn && cart.length)
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
          <div className='checkout-invoice-container'>{/* <Invoice /> */}</div>
        </div>
      </div>
    </div>
  )
}
