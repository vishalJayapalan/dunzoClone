import React from 'react'

export default function Subcategories (props) {
  return (
    <a className='subcategory-button' href={'#' + props.itemId} rel='internal'>
      {props.subcategory}
    </a>
  )
}
