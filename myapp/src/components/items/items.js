import React, { useState } from 'react'
import Item from './item'
import SubCategoryName from './subCategoryName'
import Subcategories from './subcategories'
import Cart from './cart'

export default function Items (props) {
  const [cart, setCart] = useState([])
  const [cartid, setCartid] = useState(1)
  const [items, setItems] = useState([
    {
      itemid: 1,
      itemname: 'Bread',
      subcategory: 'Breakfast & Diary',
      itemsize: '400 Gms',
      itemprice: 35
    },
    {
      itemid: 2,
      itemname: 'Cheese Slices',
      subcategory: 'Breakfast & Diary',
      itemsize: '10 Slices',
      itemprice: 100
    },
    {
      itemid: 3,
      itemname: 'Eggs',
      subcategory: 'Breakfast & Diary',
      itemsize: '6 Eggs',
      itemprice: 48
    },
    {
      itemid: 4,
      itemname: 'Milk',
      subcategory: 'Breakfast & Diary',
      itemsize: '500 Ml',
      itemprice: 25
    },
    {
      itemid: 5,
      itemname: 'Sugar',
      subcategory: 'Provisions',
      itemsize: '1 Kg',
      itemprice: 50
    },
    {
      itemid: 6,
      itemname: 'Cocunut Milk',
      subcategory: 'Provisions',
      itemsize: '50 Ml',
      itemprice: 85
    },
    {
      itemid: 7,
      itemname: 'Split Cashew',
      subcategory: 'Provisions',
      itemsize: '200 Gms',
      itemprice: 150
    },
    {
      itemid: 8,
      itemname: 'Red Rajma',
      subcategory: 'Provisions',
      itemsize: '500 Gms',
      itemprice: 55
    }
  ])

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
