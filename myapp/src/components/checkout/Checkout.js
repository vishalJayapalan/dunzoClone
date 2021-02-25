import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

// import { getCookie } from '../util/cookies'

import Navbar from '../navbar/Navbar'
import './Checkout.css'

import Cart from '../cart/cart'
import { UserContext } from '../context/user/UserContext'

// import UserAddress from '../userAddress/userAddress'
import UserAddresses from '../userAddress/userAddresses'
import AddUserAddress from '../userAddress/addUserAddress'

export default function Checkout (props) {
  const { setShowLogin, isLoggedIn, deleteAllItemsFromCart, cart } = useContext(
    UserContext
  )
  const [addressSelected, setAddressSelected] = useState(false)

  const [userAddresses, setUserAddresses] = useState([])

  const [newOrderId, setNewOrderId] = useState(null)

  const [paid, setPaid] = useState(false)

  const [addNewAddress, setAddNewAddress] = useState('')
  const [shopAddress, setShopAddress] = useState('')

  const getShopDetails = async () => {
    const data = await window.fetch(`/shop/shop/${props.match.params.shopid}/`)
    if (data.ok) {
      const jsonData = await data.json()
      // console.log('JSONDATAAddress', jsonData)
      setShopAddress(jsonData[0].address)
    }
  }

  useEffect(() => {
    getShopDetails()
  }, [])

  const getUserAddress = async () => {
    const data = await window.fetch(`/userAddress/${isLoggedIn}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      // console.log('JSONDATA', jsonData)
      setUserAddresses(jsonData)
    } else {
    }
  }

  useEffect(() => {
    console.log('ISLOGGEDIN', isLoggedIn)
    if (isLoggedIn) getUserAddress()
  }, [isLoggedIn])

  const createOrder = async () => {
    const data = await window.fetch(`/order/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'x-auth-token': getCookie('x-auth-token')
      },
      body: JSON.stringify({
        deliveryaddress: addressSelected,
        shopaddress: shopAddress
      })
    })
    if (data.ok) {
      const order = await data.json()
      console.log('JSONDATAORDER', order)
      setNewOrderId(order[0].id)
    } else {
      console.log(data.status)
    }
  }

  const addNewUserAddress = async address => {
    const data = await window.fetch(`/useraddress/${isLoggedIn}/`, {
      method: 'POST',
      body: JSON.stringify({ address, category: 'Home' }),
      headers: {
        'Content-Type': 'application/json'
        // 'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const newAddress = await data.json()
      setUserAddresses(prevAddresses => [...prevAddresses, newAddress[0]])
      setAddNewAddress(false)
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
              <UserAddresses
                userAddresses={userAddresses}
                setAddNewAddress={setAddNewAddress}
                setAddressSelected={setAddressSelected}
              />
              // <div className='addresses-container'>
              //   <div
              //     className='add-new-address-container'
              //     onClick={() => setAddNewAddress(true)}
              //   >
              //     <p>
              //       <span>+</span> Add new Address
              //     </p>
              //   </div>
              //   {userAddresses.map(userAddress => (
              //     <UserAddress
              //       key={userAddress.addressid}
              //       userAddress={userAddress}
              //       setAddressSelected={setAddressSelected}
              //     />
              //   ))}
              // </div>
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
