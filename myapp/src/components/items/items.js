import React, { useState, useEffect, useContext } from 'react'
import Item from './item'
import SubCategoryName from './subCategoryName'
import Subcategories from './subcategories'
import Cart from './cart'
import Navbar from '../navbar/Navbar'

import { AppContext } from '../context/AppContext'

export default function Items (props) {
  const { items, cart, getItems, getCart, addToCart, updateCart } = useContext(
    AppContext
  )

  useEffect(() => {
    getItems(props.match.params.shopid)
    getCart()
  }, [])

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
      />
    )
  })
  return (
    <div className='items-page'>
      <Navbar />
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
          <Cart showToCheckout={true} /> {/* can remove this  */}
        </div>
      </div>
    </div>
  )
}
