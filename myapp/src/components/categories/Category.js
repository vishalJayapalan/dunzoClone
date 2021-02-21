import React from 'react'
import { Link } from 'react-router-dom'
require('dotenv').config()

export default function Category (props) {
  const { id, name } = props.category
  const image = name.split(' ').join('_')
  return (
    <div className='category-outer-container'>
      <Link style={{ textDecoration: 'none' }} to={`/stores/${name}/${id}`}>
        <div className='category-container'>
          <img
            className='category-image'
            src={`/images/${image}.png`}
            alt={`${name}`}
          />
          <p className='category-name'>{name}</p>
        </div>
      </Link>
    </div>
  )
}
