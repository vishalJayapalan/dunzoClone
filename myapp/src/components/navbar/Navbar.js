import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Signin from '../signIn&signUp/Signin'
import Signup from '../signIn&signUp/Signup'

import { UserContext } from '../context/user/UserContext'

export default function Navbar ({ hideLoginAndLogout }) {
  const {
    showLogin,
    showRegister,
    setShowLogin,
    isLoggedIn,
    setIsLoggedIn,
    cart,
    deleteAllItemsFromCartState
  } = useContext(UserContext)

  return (
    <div className='nav-container'>
      <Link
        className='app-name-container'
        style={{ textDecoration: 'none' }}
        to={'/'}
      >
        <span className='app-name'>Donesooo</span>
      </Link>

      {!hideLoginAndLogout && (
        <div className='nav-cartimg-signin-container'>
          <div className='nav-cart-container'>
            {/* <img
              src='/images/cart2.png'
              alt='cart-icon'
              className='nav-cart-image'
            /> */}
            <i className='fas fa-shopping-cart'></i>
            {cart.length ? (
              <div className='nav-cart-count'>{cart.length}</div>
            ) : (
              <div />
            )}
          </div>
          {isLoggedIn ? (
            // <span
            //   className='nav-signin-btn'
            //   onClick={() => {
            //     setIsLoggedIn(false)
            //     document.cookie =
            //       'x-auth-token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
            //     deleteAllItemsFromCartState()
            //   }}
            // >
            //   Logout
            // </span>
            <Link
              className='profile-icon'
              style={{ textDecoration: 'none' }}
              to={'/profile'}
            >
              <img
                className='user-avatar'
                src='/images/default-avatar.png'
                alt='User Avathar'
              ></img>
              {/* <i className='fas fa-user-circle' /> */}
            </Link>
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
