import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { getCookie } from '../util/cookies'
import ShowOrders from '../orders/ShowOrders'
import './Profile.css'
import UserAddresses from '../userAddress/userAddresses'
import AddUserAddress from '../userAddress/addUserAddress'

import { UserContext } from '../context/user/UserContext'

export default function Profile () {
  const {
    isLoggedIn,
    setIsLoggedIn,
    userDetails,
    deleteAllItemsFromCartState
  } = useContext(UserContext)
  const [redirectToHomePage, setRedirectToHomePage] = useState(false)
  const [showOrders, setShowOrders] = useState(true)
  const [showAddresses, setShowAddresses] = useState(false)

  const [userAddresses, setUserAddresses] = useState([])

  const [addNewAddress, setAddNewAddress] = useState(false)
  // console.log('userDetails', userDetails)
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
      setUserAddresses(jsonData)
    } else {
      // console.log('yHere')
    }
  }

  const addNewUserAddress = async address => {
    const data = await window.fetch(`/useraddress/${isLoggedIn}/`, {
      method: 'POST',
      body: JSON.stringify({ address, category: 'Home' }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const newAddress = await data.json()
      setUserAddresses(prevAddresses => [...prevAddresses, newAddress[0]])
      setAddNewAddress(false)
    }
  }

  const deleteUserAddress = async addressId => {
    const data = await window.fetch(`/useraddress/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const deletedAddress = await data.json()
      const updatedAddress = userAddresses.filter(a => {
        return a.addressid !== deletedAddress[0].addressid
      })
      setUserAddresses(updatedAddress)
    } else {
      console.log('Error in Deleting')
    }
  }

  useEffect(() => {
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
                  <b>{userDetails.full_name}</b>
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
              <a
                className={showOrders ? 'selected' : 'profileSidebarButtons'}
                onClick={() => {
                  setShowOrders(true)
                  setShowAddresses(false)
                }}
              >
                Orders List
              </a>
              <a
                className={showAddresses ? 'selected' : 'profileSidebarButtons'}
                onClick={() => {
                  setShowAddresses(true)
                  setShowOrders(false)
                }}
              >
                Addresses
              </a>
            </div>
            <div className='profile-contents'>
              {addNewAddress && (
                <AddUserAddress
                  setAddNewAddress={setAddNewAddress}
                  addNewUserAddress={addNewUserAddress}
                />
              )}
              {showOrders && <ShowOrders />}
              {showAddresses && (
                <UserAddresses
                  userAddresses={userAddresses}
                  setAddNewAddress={setAddNewAddress}
                  fromProfile={true}
                  deleteUserAddress={deleteUserAddress}
                />
              )}
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
