import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowOrder ({ userOrder }) {
  return (
    <div className='user-order-container'>
      <div className='order-category-container'>
        <img
          className='user-category-image'
          src='/images/Groceries_&amp;_Essentials.png'
          alt='Groceries &amp; Essentials'
        ></img>
        <span className='user-category'>Groceries &amp; Essentials</span>
      </div>
      <div className='shop-name'>{userOrder.shop_address}</div>
      <div className='user-address'>{userOrder.delivery_address}</div>
      <div className='hr'></div>
      <div className='status-track'>
        {userOrder.status === 'delivered' && <div>Completed</div>}
        <Link
          className='track-order'
          style={{ textDecoration: 'none' }}
          to={`/track-order/${userOrder.id}`}
        >
          Track Order
        </Link>
      </div>
    </div>
  )
}
