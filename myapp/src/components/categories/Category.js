import React from 'react'
import { Link } from 'react-router-dom'
// import path from 'path'
require('dotenv').config()
console.log(process.env.NODE_ENV === 'production')

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
