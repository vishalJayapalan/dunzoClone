import React, { useState, useEffect, useContext } from 'react'
import Item from './item'
import SubCategoryName from './subCategoryName'
import Subcategories from './subcategories'
import Cart from './cart'

import { AppContext } from '../context/AppContext'

export default function Items (props) {
  const { items, cart, getItems, getCart, addToCart, updateCart } = useContext(
    AppContext
  )

  // const [cart, setCart] = useState([])
  // const [items, setItems] = useState([])

  // const getItems = async () => {
  //   const data = await window.fetch(
  //     `http://localhost:5000/items/${props.match.params.shopid}`
  //   )
  //   const jsonData = await data.json()
  //   setItems(jsonData)
  // }

  // const getCart = async () => {
  //   const data = await window.fetch(`http://localhost:5000/cart`)
  //   const jsonData = await data.json()
  //   setCart(jsonData)
  // }

  useEffect(() => {
    // fetchItems()
    getItems(props.match.params.shopid)
    getCart()
    // fetchCart()
  }, [])

  // async function updateCart (updateItem, incOrDec) {
  //   if (+updateItem.cartitemquantity === 1 && incOrDec === '-') {
  //     await window.fetch(`http://localhost:5000/cart/${updateItem.cartid}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-type': 'application/json'
  //       }
  //     })
  //     return setCart(
  //       cart.filter(cartItem => cartItem.cartid !== updateItem.cartid)
  //     )
  //   }

  //   setCart(
  //     cart.map(cartItem => {
  //       if (cartItem.cartid === updateItem.cartid) {
  //         if (incOrDec === '+') {
  //           cartItem.cartitemquantity++
  //           return cartItem
  //         } else {
  //           cartItem.cartitemquantity--
  //           return cartItem
  //         }
  //       }
  //       return cartItem
  //     })
  //   )
  //   await window.fetch(`http://localhost:5000/cart/${updateItem.cartid}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({ cartitemquantity: updateItem.cartitemquantity })
  //   })
  // }

  // async function addToCart (item) {
  //   try {
  //     const data = await window.fetch('http://localhost:5000/cart', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         itemid: item.itemid,
  //         itemname: item.itemname,
  //         shopname: props.match.params.shopname,
  //         cartitemquantity: 1
  //       })
  //     })
  //     if (!data.ok) {
  //       throw data
  //     }
  //     const jsonData = await data.json()
  //     console.log(jsonData)
  //     // item.cartid = jsonData
  //     item.cartitemquantity = 1
  //     item.shopname = props.match.params.shopname
  //     setCart([...cart, item])
  //     // setCartid(cartid + 1)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  let lastSubCategory = null
  const disp = []
  const subcategories = []
  items.forEach(item => {
    if (lastSubCategory !== item.subcategory) {
      lastSubCategory = item.subcategory
      disp.push(
        <SubCategoryName
          key={item.itemid + 'subname'}
          item={item}
          subcategory={item.subcategory}
        />
      )
      subcategories.push(
        <Subcategories
          key={item.itemid + 'subcat'}
          item={item}
          subcategory={item.subcategory}
        />
      )
    }
    disp.push(
      <Item
        key={item.itemid}
        item={item}
        shopname={props.match.params.shopname}
        addToCart={addToCart} // can remove this
        updateCart={updateCart} // canremove this
        cart={cart} // can remove this
      />
    )
  })
  return (
    <div className='items-page'>
      <div className='items-shop-name-container'>
        {/* PUT IMAGE OF SHOP HERE */}
        <h1 className='items-shop-name'>{props.match.params.shopname}</h1>
      </div>
      <div className='items-flex-container'>
        <div className='search-item-container'>
          <input className='search-item' placeholder='Search for an item' />
        </div>
        <hr />
        <div className='items-grid-container'>
          <div className='subcategories-container'>{subcategories}</div>
          <div className='items-container'>{disp}</div>
          <Cart cart={cart} updateCart={updateCart} /> {/* can remove this  */}
        </div>
      </div>
    </div>
  )
}
