import React, { useEffect, useState } from 'react'

import Shop from './shop'

export default function Shops (props) {
  const { categoryname, categoryid } = props.match.params
  const [shops, setShops] = useState([])
  const fetchShops = async () => {
    const data = await window.fetch(`http://localhost:5000/shops/${categoryid}`)
    const jsonData = await data.json()
    setShops(jsonData)
  }

  useEffect(() => {
    fetchShops()
  }, [])
  return (
    <div className='shops-page'>
      <h1 className='category-name-inshop'>{categoryname}</h1>
      <div className='shops-container'>
        {shops.map(shop => (
          <Shop key={shop.shopid} shop={shop} />
        ))}
      </div>
    </div>
  )
}
