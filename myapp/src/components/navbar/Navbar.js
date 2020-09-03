import React, { useContext, useEffect, useState } from 'react'
import Signin from '../signIn&signUp/Signin'
import Signup from '../signIn&signUp/Signup'

import { AppContext } from '../context/App/AppContext'

import { getCookie, setCookie } from '../util/cookies'

export default function Navbar () {
  const {
    showLogin,
    showRegister,
    setShowLogin,
    isLoggedIn,
    setIsLoggedIn
  } = useContext(AppContext)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const token = getCookie('x-auth-token')
    token && setIsLoggedIn(true)
  }, [])

  return (
    <div className='nav-container'>
      <span className='app-name'>DunzoClone</span>
      <div></div>
      <div className='nav-cartimg-signin-container'>
        <div className='nav-cart-container'>
          <img src='/images/cart2.png' className='nav-cart-image' />
        </div>
        {isLoggedIn ? (
          <span
            onClick={() => {
              setIsLoggedIn(false)
              document.cookie =
                'x-auth-token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
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
      {showLogin && <Signin />}
      {showRegister && <Signup />}
    </div>
  )
}
