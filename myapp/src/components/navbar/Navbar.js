import React, { useContext, useEffect, useState } from 'react'
import Signin from '../signIn&signUp/Signin'
import Signup from '../signIn&signUp/Signup'

import { AppContext } from '../context/App/AppContext'

// import { getCookie, setCookie } from '../util/cookies'

export default function Navbar ({ hideLoginAndLogout }) {
  const {
    showLogin,
    showRegister,
    setShowLogin,
    isLoggedIn,
    setIsLoggedIn,
    cart,
    deleteAllItemsFromCartState
  } = useContext(AppContext)
  return (
    <div className='nav-container'>
      <span className='app-name'>Donesooo</span>
      <div></div>

      {!hideLoginAndLogout && (
        <div className='nav-cartimg-signin-container'>
          <div className='nav-cart-container'>
            <img src='/images/cart2.png' className='nav-cart-image' />
            {cart.length ? (
              <div className='nav-cart-count'>{cart.length}</div>
            ) : (
              <div />
            )}
          </div>
          {isLoggedIn ? (
            <span
              className='nav-signin-btn'
              onClick={() => {
                setIsLoggedIn(false)
                document.cookie =
                  'x-auth-token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
                deleteAllItemsFromCartState()
              }}
            >
              Logout
            </span>
          ) : (
            <span className='nav-signin-btn' onClick={() => setShowLogin(true)}>
              Sign in
            </span>
          )}
        </div>
      )}
      {showLogin && <Signin />}
      {showRegister && <Signup />}
    </div>
  )
}
