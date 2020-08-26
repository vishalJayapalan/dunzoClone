import React from 'react'

export default function Navbar () {
  return (
    <div className='nav-container'>
      <span className='app-name'>DunzoClone</span>
      <div></div>
      <div className='nav-cartimg-signin-container'>
        <div className='nav-cart-container'>
          <img src='/images/cart2.png' className='nav-cart-image' />
        </div>
        <span>Sign in</span>
      </div>
    </div>
  )
}
