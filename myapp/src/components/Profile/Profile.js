import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { getCookie } from '../util/cookies'
import ShowOrders from '../orders/ShowOrders'
import './Profile.css'

import { UserContext } from '../context/user/UserContext'

export default function Profile () {
  const {
    isLoggedIn,
    setIsLoggedIn,
    userDetails,
    deleteAllItemsFromCartState
  } = useContext(UserContext)
  const [redirectToHomePage, setRedirectToHomePage] = useState(false)

  const [userAddresses, setUserAddresses] = useState([])

  const getUserAddress = async () => {
    const data = await window.fetch(`/userAddress/${isLoggedIn}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      console.log('userAddresses', jsonData)
      setUserAddresses(jsonData)
    } else {
    }
  }

  useEffect(() => {
    // getAllUserOrders()
    getUserAddress()
  }, [])

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
            {userDetails && (
              <div>
                <p>
                  <b>{userDetails.fullname}</b>
                </p>
                <p>{userDetails.email}</p>
              </div>
            )}
            <button
              className='signout-btn'
              onClick={() => {
                setIsLoggedIn(false)
                document.cookie =
                  'x-auth-token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
                deleteAllItemsFromCartState()
                setRedirectToHomePage(true)
              }}
            >
              Logout
            </button>
          </div>
          <div className='profile-contents-container'>
            <div className='profile-sidebar-container'>
              <a className='selected'>Orders List</a>
              <a>Addresses</a>
            </div>
            <div className='profile-contents'>
              <ShowOrders />
            </div>
          </div>
        </div>
      </div>
      {/* should have an order list and addressed sidebar*/}
      {/* should show all the orders and should be able to track the order */}
      {/* should be able to add,delete and update the addresses */}
    </div>
  )
}
