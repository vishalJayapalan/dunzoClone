import React, { useState, useEffect } from 'react'
import { getCookie } from '../util/cookies'
import ShowOrder from './ShowOrder'
import './showOrders.css'

export default function ShowOrders () {
  const [userOrders, setUserOrders] = useState([])

  useEffect(() => {
    getAllUserOrders()
  }, [])

  async function getAllUserOrders () {
    const data = await window.fetch('/order/all/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      setUserOrders(jsonData)
    }
  }

  return (
    <>
      {userOrders.length === 0 ? (
        <h1>No Orders</h1>
      ) : (
        <div className='user-orders-container'>
          {userOrders.map(userOrder => (
            <ShowOrder key={userOrder.orderid} userOrder={userOrder} />
          ))}
        </div>
      )}
    </>
  )
}
