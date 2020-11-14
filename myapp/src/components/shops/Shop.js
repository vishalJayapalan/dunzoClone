import React from 'react'
import { Link } from 'react-router-dom'

export default function Shop (props) {
  return (
    <div>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/${props.shop.categoryid}/shop/${props.shop.shopname}/${props.shop.shopid}`}
      >
        <div className='shop-container'>
          <img
            className='shop-image'
            src='/images/groceries.jpeg'
            alt='shopName'
          />
          <div className='shop-name-container'>
            <p className='shop-name'>{props.shop.shopname}</p>
            <p className='shop-address'>kannur-kerala</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
