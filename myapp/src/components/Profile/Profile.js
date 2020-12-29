import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import './Profile.css'

import { AppContext } from '../context/App/AppContext'

export default function Profile () {
  const { setIsLoggedIn, deleteAllItemsFromCartState } = useContext(AppContext)
  const [redirectToHomePage, setRedirectToHomePage] = useState(false)

  if (redirectToHomePage) {
    return (
      <div>
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      </div>
    )
  }

  return (
    <div className='profile-page'>
      <Navbar />
      <div className='profile-outer-container'>
        <div className='profile-inner-container'>
          <div className='profile-header-container'>
            <div>userName</div>
            <span
              className='nav-signin-btn'
              onClick={() => {
                setIsLoggedIn(false)
                document.cookie =
                  'x-auth-token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
                deleteAllItemsFromCartState()
                setRedirectToHomePage(true)
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
      {/* should have Name, contact, email  and a logout button*/}
      {/* should have an order list and addressed sidebar*/}
      {/* should show all the orders and should be able to track the order */}
      {/* should be able to add,delete and update the addresses */}
    </div>
  )
}
