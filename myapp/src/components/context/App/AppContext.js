import React, { useReducer, createContext, useState, useEffect } from 'react'
// import useLocalStorage from '../../hooks/useLocalstorage'

import AppReducer from './AppReducer'

export const AppContext = createContext()

const initialState = {
  cart: [],
  items: []
}

export const AppContextProvider = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState('')

  // const [cart, setCart] = useLocalStorage('cart')

  const getItems = async shopid => {
    try {
      const data = await window.fetch(`http://localhost:5000/items/${shopid}`)
      if (!data.ok) {
        throw data
      }
      const jsonData = await data.json()
      dispatch({ type: 'GET_ITEMS', payload: jsonData })
      // : dispatch({ type: 'ERROR', payload: jsonData.msg })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const updateItems = async (shopid, newItems) => {
    try {
      const data = await window.fetch(`http://localhost:5000/items/${shopid}`)
      if (!data.ok) {
        throw data
      }
      const jsonData = await data.json()
      dispatch({ type: 'UPDATE_ITEMS', payload: { items: jsonData, newItems } })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }

    // dispatch({ type: 'UPDATE_ITEMS', payload: newItems })
  }

  const getCart = async () => {
    try {
      const data = await window.fetch(`http://localhost:5000/cart`)
      if (!data.ok) {
        throw data
      }
      const jsonData = await data.json()
      console.log('getCart', jsonData)
      jsonData.length && dispatch({ type: 'GET_CART', payload: jsonData })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  // function addToCart (item, shopname) {
  //   let cart = localStorage.getItem('Donesooo-cart')
  //   if (cart && cart.length) {
  //     console.log(cart)
  //     cart = JSON.parse(cart)
  //     cart.push(item)
  //     localStorage.setItem('Donesooo-cart', JSON.stringify(cart))
  //   } else localStorage.setItem('Donesooo-cart', JSON.stringify([item]))
  // }

  async function addToCart (item, shopname) {
    try {
      const data = await window.fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          item: item,
          itemid: item.itemid,
          shopname: shopname,
          itemname: item.itemname,
          cartitemquantity: 1
        })
      })
      if (!data.ok) {
        throw data
      }
      const jsonData = await data.json()
      console.log('addToCart', jsonData)
      jsonData[0].itemsize = item.itemsize
      jsonData[0].itemprice = item.itemprice
      jsonData[0].quantity = item.quantity
      dispatch({ type: 'ADD_TO_CART', payload: jsonData })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  async function updateCart (updateItem, incOrDec) {
    try {
      if (+updateItem.cartitemquantity === 1 && incOrDec === '-') {
        const data = await window.fetch(
          `http://localhost:5000/cart/${updateItem.cartid}`,
          {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json'
            }
          }
        )
        if (!data.ok) {
          throw data
        }
        return dispatch({ type: 'DELETE_ITEM_FROM_CART', payload: updateItem })
      }
      if (incOrDec === '+')
        dispatch({ type: 'INCREMENT_ITEMCOUNT_FROM_CART', payload: updateItem })
      else
        dispatch({ type: 'DECREMENT_ITEMCOUNT_FROM_CART', payload: updateItem })
      await window.fetch(`http://localhost:5000/cart/${updateItem.cartid}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          cartitemquantity: updateItem.cartitemquantity,
          type: incOrDec
        })
      })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  return (
    <AppContext.Provider
      value={{
        cart: state.cart,
        items: state.items,
        getItems,
        updateItems,
        getCart,
        addToCart,
        updateCart,
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
        isLoggedIn,
        setIsLoggedIn,
        deliveryAddress,
        setDeliveryAddress
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
