import React, { useState, useEffect } from 'react'
import Item from './item'
import SubCategoryName from './subCategoryName'
import Subcategories from './subcategories'
import Cart from './cart'

export default function Items (props) {
  const [cart, setCart] = useState([])
  const [cartid, setCartid] = useState(1)
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    const data = await window.fetch(
      `http://localhost:5000/items/${props.match.params.shopid}`
    )
    const jsonData = await data.json()
    setItems(jsonData)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  function cartQuantityUpdate (updateItem, incOrDec) {
    if (updateItem.cartitemquantity === 1 && incOrDec === '-') {
      return setCart(
        cart.filter(cartItem => cartItem.cartid !== updateItem.cartid)
      )
    }
    setCart(
      cart.map(cartItem => {
        if (cartItem.cartid === updateItem.cartid) {
          if (incOrDec === '+') {
            cartItem.cartitemquantity++
            return cartItem
          } else {
            cartItem.cartitemquantity--
            return cartItem
          }
        }
        return cartItem
      })
    )
  }

  function addToCart (item) {
    item.cartid = cartid
    item.cartitemquantity = 1
    item.shopname = props.match.params.shopname
    setCart([...cart, item])
    setCartid(cartid + 1)
  }

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
        addToCart={addToCart}
        cartQuantityUpdate={cartQuantityUpdate}
        cart={cart}
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
          <Cart cart={cart} cartQuantityUpdate={cartQuantityUpdate} />
        </div>
      </div>
    </div>
  )
}
