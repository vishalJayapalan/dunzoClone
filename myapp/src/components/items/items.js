import React, { useState, useEffect, useContext } from 'react'
import Item from './item'
import SubCategoryName from './subCategoryName'
import Subcategories from './subcategories'
import Cart from './cart'
import Navbar from '../navbar/Navbar'
import Search from './search'

import { AppContext } from '../context/App/AppContext'

export default function Items (props) {
  const { items, getItems, updateItems, getCart } = useContext(AppContext)

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
          key={
            item.subcategory === 'Search Results'
              ? item.itemid + 'searchResults'
              : item.itemid + 'subname'
          }
          itemId={item.itemid}
          subcategory={item.subcategory}
        />
      )
      subcategories.push(
        <Subcategories
          key={
            item.subcategory === 'Search Results'
              ? item.itemid + 'searchResultsCat'
              : item.itemid + 'subcat'
          }
          itemId={item.itemid}
          subcategory={item.subcategory}
        />
      )
    }
    disp.push(
      <Item
        key={
          item.subcategory === 'Search Results'
            ? item.itemid + 'searchResultsItem'
            : item.itemid
        }
        item={item}
        shopname={props.match.params.shopname}
      />
    )
  })

  const includeSearchResults = newItems => {
    updateItems(props.match.params.shopid, newItems)
  }
  return (
    <div className='items-page'>
      <Navbar />
      <div className='items-shop-name-container'>
        {/* PUT IMAGE OF SHOP HERE */}
        <h1 className='items-shop-name'>{props.match.params.shopname}</h1>
      </div>
      <div className='items-flex-container'>
        <Search includeSearchResults={includeSearchResults} />

        {/* <hr /> */}
        <div className='items-grid-container'>
          <div className='subcategories-container'>{subcategories}</div>
          <div className='items-container'>{disp}</div>
          <Cart showToCheckout={true} /> {/* can remove this  */}
        </div>
      </div>
    </div>
  )
}
