import React, { useContext, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { getCookie } from '../util/cookies'

// import Nominatim from 'nominatim-geocoder'

import Navbar from '../navbar/Navbar'
import './Checkout.css'

import Cart from '../items/cart'
import { AppContext } from '../context/App/AppContext'

import UserAddress from '../userAddress/userAddress'
import AddUserAddress from '../userAddress/addUserAddress'

export default function Checkout (props) {
  const {
    showLogin,
    showRegister,
    setShowLogin,
    isLoggedIn,
    setIsLoggedIn,
    deliveryAddress,
    setDeliveryAddress,
    deleteAllItemsFromCart,
    cart
  } = useContext(AppContext)
  const [addressSelected, setAddressSelected] = useState(false)

  const [userAddresses, setUserAddresses] = useState([])

  const [newOrderId, setNewOrderId] = useState(null)

  const [paid, setPaid] = useState(false)

  const [addNewAddress, setAddNewAddress] = useState('')
  const [shopAddress, setShopAddress] = useState('')

  // const geocoding = async address => {
  //   const geocoder = new Nominatim()

  //   const latlong = await geocoder.search({ q: address })
  //   console.log('latlong', latlong)
  // }

  // geocoding('srinidhi sagar')

  const getShopDetails = async () => {
    const data = await window.fetch(
      `http://localhost:5000/shops/shop/${props.match.params.shopid}`
    )
    if (data.ok) {
      const jsonData = await data.json()
      setShopAddress(jsonData[0].address)
    }
  }

  useEffect(() => {
    getShopDetails()
  }, [])

  const getUserAddress = async () => {
    const data = await window.fetch(
      `http://localhost:5000/userAddress/${isLoggedIn}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    if (data.ok) {
      const jsonData = await data.json()
      setUserAddresses(jsonData)
    } else {
    }
  }

  useEffect(() => {
    getUserAddress()
  }, [isLoggedIn])

  const createOrder = async () => {
    const data = await window.fetch(`http://localhost:5000/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      },
      body: JSON.stringify({
        deliveryaddress: addressSelected,
        shopaddress: shopAddress
      })
    })
    if (data.ok) {
      const order = await data.json()
      setNewOrderId(order[0].orderid)
    }
  }

  const addNewUserAddress = async address => {
    const data = await window.fetch(
      `http://localhost:5000/useraddress/${isLoggedIn}`,
      {
        method: 'POST',
        body: JSON.stringify({ address, category: 'Home' }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    if (data.ok) {
      const newAddress = await data.json()
      // console.log('userDetails', req.user)
      console.log(newAddress)
      setUserAddresses(prevAddresses => [...prevAddresses, newAddress[0]])
      setAddNewAddress(false)
      // const order = await data.json()
      // setNewOrderId(order[0].orderid)
    }
  }

  const toPay = async () => {
    deleteAllItemsFromCart()
    await createOrder()
    setPaid(true)
  }

  if (paid) {
    return (
      <div>
        <Redirect
          to={{
            pathname: `/track-order/${newOrderId}`,
            state: { test: 'test' }
          }}
        />
      </div>
    )
  }
  // console.log('userAddress',userAddress)

  return (
    <div className='checkout-page'>
      <Navbar />
      {addNewAddress && (
        <AddUserAddress
          setAddNewAddress={setAddNewAddress}
          addNewUserAddress={addNewUserAddress}
        />
      )}
      <div className='checkout-container'>
        <div className='checkout-signin-deliveryaddress-paybtn'>
          {/* LOGIN SECTION */}
          {!isLoggedIn && (
            <div className='checkout-signin-container'>
              <div className='checkout-signin-inner-container'>
                <h2 className='checkout-signin-title'>
                  Sign in to place your order
                </h2>
                <p className='checkout-signin-info'>
                  New to dunzoClone? Signup/Signin to get started
                </p>
                <button
                  className='checkout-signinBtn'
                  onClick={() => {
                    setShowLogin(true)
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {/* ADDRESS SECTION */}

          <div className='checkout-delivery-address-container' disabled={true}>
            <div className='checkout-delivery-address-title-container'>
              <h2 className='checkout-address-title'>Add delivery address</h2>
              <p className='address-description'>
                Choose your delivery address from address book or add new
              </p>
            </div>
            {isLoggedIn && !addressSelected && (
              <div className='addresses-container'>
                <div
                  className='add-new-address-container'
                  onClick={() => setAddNewAddress(true)}
                >
                  <p>
                    <span>+</span> Add new Address
                  </p>
                </div>
                {userAddresses.map(userAddress => (
                  <UserAddress
                    key={userAddress.addressid}
                    userAddress={userAddress}
                    setAddressSelected={setAddressSelected}
                  />
                ))}
              </div>
            )}
            {addressSelected && (
              <div className='selected-address-container'>
                <div className='selected-address-title-container'>
                  <h2>Selected Address: </h2>
                  <button onClick={() => setAddressSelected(false)}>
                    Change
                  </button>
                </div>
                <div>
                  <div className='selected-address'>
                    {/* <h2>Home</h2> */}
                    <p>{addressSelected}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PAYING SECTION */}
          {/* <Link
            style={{ textDecoration: 'none' }}
            to={{
              pathname: `/track-order`,
              aboutProps: { name: 'test information' }
            }}
          > */}
          <button
            className='paybtn'
            disabled={!(addressSelected && isLoggedIn && cart.length)}
            onClick={() => {
              toPay()
            }}
            style={
              !(addressSelected && isLoggedIn && cart.length)
                ? { backgroundColor: 'grey' }
                : { backgroundColor: 'green' }
            }
          >
            Pay
          </button>
          {/* </Link> */}
        </div>

        {/* CART SECTION */}
        <div className='checkout-cart-invoice-container'>
          <div className='checkout-cart-container'>
            <Cart showToCheckout={false} />
          </div>
          <div className='checkout-invoice-container'>{/* <Invoice /> */}</div>
        </div>
      </div>
    </div>
  )
}
