import React, { useState, useEffect } from 'react'
import Category from './Category'
import Navbar from '../navbar/Navbar'
import { getCookie } from '../util/cookies'

export default function Categories () {
  const [categories, setCategories] = useState([])
  const fetchCategories = async () => {
    const data = await window.fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })

    const jsonData = await data.json()
    setCategories(jsonData)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className='categories-page'>
      <Navbar />
      <h1 className='category-title'>What Do you Want To Get Done?</h1>
      <div className='categories-container'>
        {categories.map(category => (
          <Category key={category.categoryid} category={category} />
        ))}
      </div>
    </div>
  )
}
