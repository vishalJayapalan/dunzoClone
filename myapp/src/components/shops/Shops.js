import React, { useEffect, useState } from 'react'

import Shop from './Shop'
import Navbar from '../navbar/Navbar'
import { getCookie } from '../util/cookies'

export default function Shops (props) {
  const { categoryname, categoryid } = props.match.params
  const [shops, setShops] = useState([])
  const fetchShops = async () => {
    const data = await window.fetch(
      `http://localhost:5000/shops/${categoryid}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    const jsonData = await data.json()
    setShops(jsonData)
  }

  useEffect(() => {
    fetchShops()
  }, [])
  return (
    <div>
      <Navbar />
      <div className='category-name-inshop-container'>
        <img
          className='category-name-inshop-img'
          src={`/images/${categoryname}.png`}
          alt='catimg'
        ></img>
        <h3 className='category-name-inshop'>{categoryname}</h3>
      </div>
      <div className='shops-page'>
        <div className='shops-container'>
          {shops.map(shop => (
            <Shop key={shop.shopid} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  )
}
