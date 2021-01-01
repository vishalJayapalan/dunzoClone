import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { getCookie } from '../util/cookies'
import './Profile.css'

import { AppContext } from '../context/App/AppContext'

export default function Profile () {
  const {
    isLoggedIn,
    setIsLoggedIn,
    userDetails,
    deleteAllItemsFromCartState
  } = useContext(AppContext)
  const [redirectToHomePage, setRedirectToHomePage] = useState(false)

  const [userAddresses, setUserAddresses] = useState([])

  const [userOrders, setUserOrders] = useState([])

  // console.log(userDetails)

  async function getAllUserOrders () {
    const data = await window.fetch('/order/all/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      setUserOrders(jsonData)
      // console.log(jsonData)
    }
  }

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
      // console.log(jsonData)
      setUserAddresses(jsonData)
    } else {
    }
  }

  useEffect(() => {
    getAllUserOrders()
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
            <div className='profile-contents'></div>
          </div>
        </div>
      </div>
      {/* should have an order list and addressed sidebar*/}
      {/* should show all the orders and should be able to track the order */}
      {/* should be able to add,delete and update the addresses */}
    </div>
  )
}
