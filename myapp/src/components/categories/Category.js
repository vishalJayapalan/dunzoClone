import React from 'react'
import { Link } from 'react-router-dom'
// import path from 'path'

export default function Category (props) {
  const { categoryid, categoryname } = props.category
  return (
    <div className='category-outer-container'>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/stores/${categoryname}/${categoryid}`}
      >
        <div className='category-container'>
          <img
            className='category-image'
            src={`/images/${categoryname}.png`}
            alt={`${categoryname}`}
          />
          <p className='category-name'>{categoryname}</p>
        </div>
      </Link>
    </div>
  )
}
