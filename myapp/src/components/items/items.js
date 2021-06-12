import React, { useEffect, useContext } from 'react'
import Item from './item'
import SubCategoryName from './subCategoryName'
import Subcategories from './subcategories'
import Cart from '../cart/cart'
import Navbar from '../navbar/Navbar'
import Search from '../search/search'
import ClearCartPopup from '../cart/clearCartPopup'

import { UserContext } from '../context/user/UserContext'
import Breadcrumbs from '../breadcrumbs'

export default function Items (props) {
  const { shopId, shopName } = props.match.params
  const { items, getItems, updateItems, clearCartPopup } = useContext(
    UserContext
  )

  useEffect(() => {
    getItems(shopId)
  }, [])

  let lastSubCategory = null
  const disp = []
  const subcategories = []

  items.forEach(item => {
    if (lastSubCategory !== item.sub_category) {
      lastSubCategory = item.sub_category
      disp.push(
        <SubCategoryName
          key={
            item.sub_category === 'Search Results'
              ? item.id + 'searchResults'
              : item.id + 'subname'
          }
          itemId={item.id}
          subcategory={item.sub_category}
        />
      )
      subcategories.push(
        <Subcategories
          key={
            item.sub_category === 'Search Results'
              ? item.id + 'searchResultsCat'
              : item.id + 'subcat'
          }
          itemId={item.id}
          subcategory={item.sub_category}
        />
      )
    }
    disp.push(
      <Item
        key={
          item.sub_category === 'Search Results'
            ? item.id + 'searchResultsItem'
            : item.id
        }
        item={item}
        shopName={shopName}
      />
    )
  })

  const includeSearchResults = newItems => {
    updateItems(shopId, newItems)
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
        <h1 className='items-shop-name'>{shopName}</h1>
      </div>

      <div className='items-flex-container'>
        {/* <Breadcrumbs /> */}
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
