import React from 'react'

export default function SubCategoryName (props) {
  return (
    <div className='subcategory-container' id={props.item.itemid}>
      <h3>{props.subcategory}</h3>
    </div>
  )
}
