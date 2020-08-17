import React, { useReducer, createContext } from 'react'

import AppReducer from './AppReducer'

export const AppContext = createContext()

export const AppContextProvider = props => {
  const [state, dispatch] = useReducer(AppReducer, { cart: [], items: [] })
  console.log(state)
  const getItems = async shopid => {
    console.log('inHereTOoooo')
    try {
      const data = await window.fetch(`http://localhost:5000/items/${shopid}`)
      const jsonData = await data.json()
      jsonData.length
        ? dispatch({ type: 'GET_ITEMS', payload: jsonData })
        : dispatch({ type: 'ERROR', payload: jsonData.msg })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getCart = async () => {
    try {
      console.log('inHere')
      const data = await window.fetch(`http://localhost:5000/cart`)
      const jsonData = await data.json()
      jsonData.length
        ? dispatch({ type: 'GET_CART', payload: jsonData })
        : dispatch({ type: 'ERROR', payload: jsonData.msg })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  async function addToCart (item, shopname) {
    try {
      const data = await window.fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          itemid: item.itemid,
          shopname: props.match.params.shopname
        })
      })
      const jsonData = await data.json()
      item.cartid = jsonData
      item.cartitemquantity = 1
      item.shopname = shopname

      jsonData
        ? dispatch({ type: 'ADD_TO_CART', payload: item })
        : dispatch({ type: 'ERROR', payload: jsonData.msg })
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
        if (!data.status) {
          throw data
        }
        return dispatch({ type: 'DELETE_ITEM_FROM_CART', payload: updateItem })
        // return setCart(
        //   cart.filter(cartItem => cartItem.cartid !== updateItem.cartid)
        // )
      }

      // setCart(
      //   cart.map(cartItem => {
      //     if (cartItem.cartid === updateItem.cartid) {
      //       if (incOrDec === '+') {
      //         cartItem.cartitemquantity++
      //         return cartItem
      //       } else {
      //         cartItem.cartitemquantity--
      //         return cartItem
      //       }
      //     }
      //     return cartItem
      //   })
      // )
      if (incOrDec === '+')
        dispatch({ type: 'INCREMENT_ITEMCOUNT_FROM_CART', payload: updateItem })
      else
        dispatch({ type: 'DECREMENT_ITEMCOUNT_FROM_CART', payload: updateItem })
      await window.fetch(`http://localhost:5000/cart/${updateItem.cartid}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ cartitemquantity: updateItem.cartitemquantity })
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
        getCart,
        addToCart,
        updateCart
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
