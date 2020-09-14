import React, { useReducer, createContext, useState, useEffect } from 'react'
import { getCookie, setCookie } from '../../util/cookies'
import AppReducer from './AppReducer'
import { v4 as uuidV4 } from 'uuid'
// import cartItem from '../../items/cartItem'

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
  const [clearCartPopup, setClearCartPopup] = useState(false)

  // const [cart, setCart] = useLocalStorage('cart')

  useEffect(() => {
    const token = getCookie('x-auth-token')
    if (token) {
      getUser()
      // getCart()
    }
  }, [])
  useEffect(() => {
    getCart()
    // if (isLoggedIn) {
    // }
  }, [isLoggedIn])

  async function getUser () {
    const data = await window.fetch(`http://localhost:5000/user/getUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    const jsonData = await data.json()
    setIsLoggedIn(jsonData.userid)
  }

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
      let jsonData = []
      if (isLoggedIn) {
        const localCart = JSON.parse(localStorage.getItem('Donesooo-cart'))
        if (localCart && localCart.length) {
          deleteAllItemsFromCart()

          // dispatch({ type: 'DELETE_ALL_ITEM_FROM_CART', payload: jsonData })
          // console.log('localCart', localCart)
          // localCart.forEach(cartitem => {
          //   console.log('localCartInforEach', cartitem)
          //   addToCart(cartitem, cartitem.shopname)
          // })
          // localStorage.clear()

          deleteAllItemsFromCartState()
          localCart.forEach(cartitem => {
            addToCart(cartitem, cartitem.shopname)
          })
        } else {
          const data = await window.fetch(`http://localhost:5000/cart`)
          if (!data.ok) {
            throw data
          }
          jsonData = await data.json()
        }
      } else {
        jsonData = JSON.parse(localStorage.getItem('Donesooo-cart'))

        if (!jsonData) {
          jsonData = []
        }
      }
      jsonData.length && dispatch({ type: 'GET_CART', payload: jsonData })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  async function addToCart (item, shopname) {
    try {
      let jsonData = []
      // if (state.cart[0].shopname !== shopname) {
      //   console.log('different shop')
      //   return
      // }
      console.log('inherealso', item, shopname)
      if (isLoggedIn) {
        const data = await window.fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getCookie('x-auth-token')
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
        jsonData = await data.json()
        localStorage.setItem('Donesooo-cartid', jsonData.cartid)
        jsonData[0].itemsize = item.itemsize
        jsonData[0].itemprice = item.itemprice
        jsonData[0].quantity = item.quantity
        console.log('afteraddCart', jsonData)
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
      await window.fetch('http://localhost:5000/cart/all', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      })
    }
    deleteAllItemsFromCartState()
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
        deleteAllItemsFromCartState,
        deleteAllItemsFromCart,
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
        isLoggedIn,
        setIsLoggedIn,
        deliveryAddress,
        setDeliveryAddress,
        clearCartPopup,
        setClearCartPopup
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
