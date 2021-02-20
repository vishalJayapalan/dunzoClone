import React, { useReducer, createContext, useState, useEffect } from 'react'
import { getCookie } from '../../util/cookies'
import UserReducer from './UserReducer'
import { v4 as uuidV4 } from 'uuid'

export const UserContext = createContext()

const initialState = {
  cart: [],
  items: []
}

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [clearCartPopup, setClearCartPopup] = useState(false)

  useEffect(() => {
    const token = getCookie('x-auth-token')
    if (token) {
      getUser()
    }
  }, [])
  useEffect(() => {
    isLoggedIn && getCart()
  }, [isLoggedIn])

  const request = async (params, method, body) => {
    const data = await window.fetch('/' + params, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      },
      body: JSON.stringify(body)
    })
    return data
  }

  const getItems = async shopid => {
    try {
      const data = await request(`items/${shopid}`, 'GET')
      if (!data.ok) {
        throw data
      }
      const jsonData = await data.json()
      dispatch({ type: 'GET_ITEMS', payload: jsonData })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const updateItems = async (shopid, newItems) => {
    try {
      const data = await window.fetch(`/items/${shopid}/`)
      if (!data.ok) {
        throw data
      }
      const jsonData = await data.json()
      dispatch({ type: 'UPDATE_ITEMS', payload: { items: jsonData, newItems } })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getCart = async () => {
    try {
      let jsonData = []
      if (isLoggedIn) {
        const localCart = JSON.parse(localStorage.getItem('Donesooo-cart'))
        if (localCart && localCart.length) {
          deleteAllItemsFromCart()
          localCart.forEach(cartitem => {
            addToCart(cartitem, cartitem.shopname)
          })
        } else {
          const data = await request('cart', 'GET')
          if (!data.ok) {
            throw data
          }
          jsonData = await data.json()
        }
      } else {
        jsonData = JSON.parse(localStorage.getItem('Donesooo-cart')) || []
      }
      jsonData.length && dispatch({ type: 'GET_CART', payload: jsonData })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  async function addToCart (item, shopname) {
    try {
      let jsonData = []
      if (isLoggedIn) {
        const data = await request('cart', 'POST', {
          item,
          itemid: item.itemid,
          shopname,
          itemname: item.itemname,
          cartitemquantity: 1
        })
        if (!data.ok) {
          throw data
        }
        jsonData = await data.json()
        localStorage.setItem('Donesooo-cartid', jsonData[0].cartid)
        jsonData[0].itemsize = item.itemsize
        jsonData[0].shopid = item.shopid
        jsonData[0].itemprice = item.itemprice
        jsonData[0].quantity = item.quantity
      } else {
        const cartid = uuidV4()
        jsonData[0] = { ...item, shopname, cartid, cartitemquantity: 1 }

        localStorage.setItem(
          'Donesooo-cart',
          JSON.stringify([...state.cart, jsonData[0]])
        )
      }
      dispatch({ type: 'ADD_TO_CART', payload: jsonData })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  async function updateCart (updateItem, incOrDec) {
    try {
      if (+updateItem.cartitemquantity === 1 && incOrDec === '-') {
        if (isLoggedIn) {
          const data = await request(`cart/${updateItem.cartid}`, 'DELETE')
          if (!data.ok) {
            throw data
          }
        } else {
          const cart = JSON.parse(localStorage.getItem('Donesooo-cart'))

          localStorage.setItem(
            'Donesooo-cart',
            JSON.stringify(
              cart.filter(cartItem => cartItem.itemid !== updateItem.itemid)
            )
          )
        }

        return dispatch({
          type: 'DELETE_ITEM_FROM_CART',
          payload: updateItem
        })
      }

      if (incOrDec === '+')
        dispatch({ type: 'INCREMENT_ITEMCOUNT_FROM_CART', payload: updateItem })
      else
        dispatch({ type: 'DECREMENT_ITEMCOUNT_FROM_CART', payload: updateItem })
      if (isLoggedIn) {
        await request(`cart/${updateItem.cartid}`, 'PUT', {
          cartitemquantity: updateItem.cartitemquantity,
          type: incOrDec
        })
      } else {
        const cart = JSON.parse(localStorage.getItem('Donesooo-cart'))
        localStorage.setItem(
          'Donesooo-cart',
          JSON.stringify(
            cart.map(cartItem => {
              if (cartItem.itemid === updateItem.itemid) {
                if (incOrDec === '+') cartItem.cartitemquantity += 1
                else {
                  cartItem.cartitemquantity -= 1
                }
              }
              return cartItem
            })
          )
        )
      }
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  function deleteAllItemsFromCartState () {
    dispatch({ type: 'DELETE_ALL_ITEM_FROM_CART', payload: [] })
    localStorage.clear()
  }

  async function deleteAllItemsFromCart () {
    if (isLoggedIn) {
      await request('cart/all', 'DELETE')
    }
    deleteAllItemsFromCartState()
  }

  async function getUser () {
    const data = await request('user/getUser', 'GET')
    const jsonData = await data.json()
    setUserDetails(jsonData)
    setIsLoggedIn(jsonData.userid)
  }

  return (
    <UserContext.Provider
      value={{
        cart: state.cart,
        items: state.items,
        getItems,
        updateItems,
        getCart,
        addToCart,
        updateCart,
        deleteAllItemsFromCartState,
        deleteAllItemsFromCart,
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
        isLoggedIn,
        userDetails,
        setUserDetails,
        setIsLoggedIn,
        deliveryAddress,
        setDeliveryAddress,
        clearCartPopup,
        setClearCartPopup
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
