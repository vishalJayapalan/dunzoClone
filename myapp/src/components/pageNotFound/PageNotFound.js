import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import './PageNotFound.css'

export default function PageNotFound () {
  return (
    <div className='page-not-found-page'>
      <Navbar />
      <div className='page-not-found-container'>
        <h2 className='page-not-found-h2'>Uh oh...</h2>
        <p>This Page Doesnt seen to Exist</p>

        <Link to='/'>
          <button>Go To Home Page</button>
        </Link>
      </div>
    </div>
  )
}
