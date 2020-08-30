import React, { useContext } from 'react'
import Signin from '../signIn&signUp/Signin'
import Signup from '../signIn&signUp/Signup'

import { AppContext } from '../context/App/AppContext'

export default function Navbar () {
  const { showLogin, showRegister, setShowLogin } = useContext(AppContext)
  return (
    <div className='nav-container'>
      <span className='app-name'>DunzoClone</span>
      <div></div>
      <div className='nav-cartimg-signin-container'>
        <div className='nav-cart-container'>
          <img src='/images/cart2.png' className='nav-cart-image' />
        </div>
        <span className='nav-signin-btn' onClick={() => setShowLogin(true)}>
          Sign in
        </span>
      </div>
      {showLogin && <Signin />}
      {showRegister && <Signup />}
    </div>
  )
}
