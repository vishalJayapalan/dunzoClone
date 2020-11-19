import React, { useEffect, useContext } from 'react'
import Item from './item'
import SubCategoryName from './subCategoryName'
import Subcategories from './subcategories'
import Cart from '../cart/cart'
import Navbar from '../navbar/Navbar'
import Search from '../search/search'
import ClearCartPopup from '../cart/clearCartPopup'

import { AppContext } from '../context/App/AppContext'

export default function Items (props) {
  const { items, getItems, updateItems, clearCartPopup } = useContext(
    AppContext
  )

  useEffect(() => {
    getItems(props.match.params.shopid)
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
        userid
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
      {clearCartPopup && <ClearCartPopup />}
      <div className='items-shop-name-container'>
        {/* PUT IMAGE OF SHOP HERE */}
        {/* <img
          className='category-name-inshop-img'
          src={`/images/${props.match.params}.png`}
          alt='catimg'
        /> */}
        <h1 className='items-shop-name'>{props.match.params.shopname}</h1>
      </div>
      <div className='items-flex-container'>
        <Search includeSearchResults={includeSearchResults} />

        <div className='items-grid-container'>
          <div className='subcategories-container'>{subcategories}</div>
          <div className='items-container'>{disp}</div>
          <Cart showToCheckout={true} />
        </div>
      </div>
    </div>
  )
}
