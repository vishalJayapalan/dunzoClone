import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user/UserContext'
import SearchItems from './searchItems'

export default function Search ({ includeSearchResults }) {
  const [searchName, setSearchName] = useState('')
  const { items } = useContext(UserContext)
  let searchResults = []
  const searchItemsBySubCategories = {}
  const searchItems = []
  const searchResultsToItems = subcategory => {
    includeSearchResults(searchItemsBySubCategories[subcategory])
    setSearchName('')
  }
  if (searchName) {
    searchResults = items.filter(item => {
      return (
        item.itemname.toLowerCase().includes(searchName.toLowerCase()) &&
        item.subcategory !== 'Search Results'
      )
    })
    if (searchResults.length) {
      searchItemsBySubCategories.All = searchResults
      searchItems.push(
        <SearchItems
          key={searchResults[0].itemid + 'allid'}
          searchItem={searchResults[0]}
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
