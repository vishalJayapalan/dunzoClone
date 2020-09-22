import React, { useState } from 'react'

import DeliveryNavbar from './DeliveryNavbar'

export default function DeliveryHome () {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  return (
    <div className='delivery-home-page'>
      <DeliveryNavbar
        showLogin={showLogin}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
      <div className='delivery-home-container'>
        <h1>Wanna become a delivery Partner!!!!</h1>
        <div className='sign-buttons-container'>
          <button
            onClick={() => {
              setShowLogin(true)
            }}
          >
            SignIn
          </button>
          <button>SignUp</button>
        </div>
      </div>
    </div>
  )
}
