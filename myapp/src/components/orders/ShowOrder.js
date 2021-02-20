import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowOrder ({ userOrder }) {
  // console.log(typeof userOrder.delivered)
  // console.log(userOrder.delivered)
  // console.log(userOrder)
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
      <div className='shop-name'>{userOrder.shopaddress}</div>
      <div className='user-address'>{userOrder.deliveryaddress}</div>
      <div className='hr'></div>
      <div className='status-track'>
        {userOrder.delivered && <div>Completed</div>}
        <Link
          className='track-order'
          style={{ textDecoration: 'none' }}
          to={`/track-order/${userOrder.orderid}`}
        >
          Track Order
        </Link>
      </div>
    </div>
  )
}
