import React from 'react'

export default function Subcategories (props) {
  return (
    <div>
      <a
        className='subcategory-button'
        href={'#' + props.item.itemid}
        rel='internal'
      >
        {props.subcategory}
      </a>
      {/* <button className='subcategory-button'>{props.subcategory}</button> */}
    </div>
  )
}
