import React, { useState, useContext } from 'react'
import { AppContext } from '../context/App/AppContext'
import SearchItems from './searchItems'

export default function Search ({ includeSearchResults }) {
  const [searchName, setSearchName] = useState('')
  const { items, cart, getItems, getCart, addToCart, updateCart } = useContext(
    AppContext
  )
  let All = []
  const searchItemsBySubCategories = {}
  const searchItems = []
  //   let
  const searchResultsToItems = subcategory => {
    includeSearchResults(searchItemsBySubCategories[subcategory])
    setSearchName('')
  }
  if (searchName) {
    All = items.filter(item => {
      // console.log('searchITEM', typeof item.subcategory)
      return (
        item.itemname.toLowerCase().includes(searchName.toLowerCase()) &&
        item.subcategory !== 'Search Results'
      )
    })
    if (All.length) {
      searchItemsBySubCategories.All = All
      searchItems.push(
        <SearchItems
          key={All[0].itemid + 'allid'}
          searchItem={All[0]}
          subcategory={'All'}
          searchResultsToItems={searchResultsToItems}
        />
      )
    }
    for (const item of items) {
      if (
        item.itemname.toLowerCase().includes(searchName.toLowerCase()) &&
        item.subcategory !== 'Search Results'
      ) {
        if (searchItemsBySubCategories[item.subcategory]) {
          searchItemsBySubCategories[item.subcategory].push(item)
        } else {
          searchItemsBySubCategories[`${item.subcategory}`] = [item]
          searchItems.push(
            <SearchItems
              key={item.itemid + 'searchid'}
              searchItem={item}
              subcategory={item.subcategory}
              searchResultsToItems={searchResultsToItems}
            />
          )
        }
      }
    }
  }
  // console.log('All', All)
  // console.log('searchItemsBySubCategories', searchItemsBySubCategories)

  //   console.log(items)
  return (
    <div className='search-outer-container'>
      <div className='search-item-container'>
        <input
          className='search-item'
          placeholder='Search for an item'
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
      </div>
      {searchName.length > 0 && (
        <div className='searched-items-on-subcategories'>{searchItems}</div>
      )}
    </div>
  )
}