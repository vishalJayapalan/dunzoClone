import React, { useState, useEffect } from 'react'
import Category from './Category'
import Navbar from '../navbar/Navbar'

export default function Categories () {
  const [categories, setCategories] = useState([])
  const fetchCategories = async () => {
    const data = await window.fetch('http://localhost:5000/categories')
    const jsonData = await data.json()
    setCategories(jsonData)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className='categories-page'>
      <Navbar />
      <h1 className='category-title'>What Do you Want To Get Done</h1>
      <div className='categories-container'>
        {categories.map(category => (
          <Category key={category.categoryid} category={category} />
        ))}
      </div>
    </div>
  )
}
