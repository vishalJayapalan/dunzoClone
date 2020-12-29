import React from 'react'
import { Link } from 'react-router-dom'
require('dotenv').config()

export default function Category (props) {
  const { categoryid, categoryname } = props.category
  const imageName = categoryname.split(' ').join('_')
  return (
    <div className='category-outer-container'>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/stores/${categoryname}/${categoryid}`}
      >
        <div className='category-container'>
          <img
            className='category-image'
            src={`/images/${imageName}.png`}
            alt={`${categoryname}`}
          />
          <p className='category-name'>{categoryname}</p>
        </div>
      </Link>
    </div>
  )
}
