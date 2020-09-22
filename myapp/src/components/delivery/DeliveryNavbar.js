import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import './delivery.css'
import Signup from './DeliveryGuySignup'
import Signin from './DeliveryGuySignin'

export default function DeliveryNavbar ({
  showLogin,
  showRegister,
  setShowRegister,
  setShowLogin
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) {
    return <Redirect to={`/delivery/${isLoggedIn}`} />
  }
  return (
    <div className='delivery-nav-container'>
      <h3>Donesooo deliverypage</h3>
      {/* <span onClick={() => setShowLogin(true)}>signin</span> */}
      {showLogin && (
        <Signin
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {showRegister && <Signup />}
    </div>
  )
}
