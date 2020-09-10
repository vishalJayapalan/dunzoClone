import React from 'react'

export default function SearchItems ({
  searchItem,
  subcategory,
  searchResultsToItems
}) {
  console.log('inSearchItems', searchItem)
  return (
    <div className='searched-item-on-subcategory'>
      <p onClick={() => searchResultsToItems(subcategory)}>
        {searchItem.itemname} in{' '}
        <span className='search-subcategory'>{subcategory}</span>
      </p>
    </div>
  )
}
