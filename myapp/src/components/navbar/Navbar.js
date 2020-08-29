import React, { useState } from 'react'
import Signin from '../signIn&signUp/Signin'
import SignUp from '../signIn&signUp/Signup'

export default function Navbar () {
  const [showLogin, setShowLogin] = useState(false)
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
      {showLogin && <SignUp />}
    </div>
  )
}
