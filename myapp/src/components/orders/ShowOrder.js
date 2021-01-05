import React from 'react'

export default function ShowOrder ({ userOrder }) {
  console.log(userOrder)
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
    </div>
  )
}
