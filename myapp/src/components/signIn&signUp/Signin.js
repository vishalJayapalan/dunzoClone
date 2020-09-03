import React, { useState, useContext } from 'react'

import { AppContext } from '../context/App/AppContext'
import { setCookie } from '../util/cookies'

export default function Signin () {
  const { setShowLogin, setShowRegister, setIsLoggedIn } = useContext(
    AppContext
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userLogin = async event => {
    event.preventDefault()
    try {
      const response = await window.fetch('http://localhost:5000/user/login', {
        method: 'POST',
        // credentials: 'include',
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (response.ok) {
        const jsonData = await response.json()
        console.log(jsonData)
        setCookie('x-auth-token', jsonData.accessToken)
        setEmail('')
        setPassword('')
        setShowLogin(false)
        setIsLoggedIn(true)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className='overlay'>
        <div className='signin-container'>
          <div className='form-container'>
            <div className='signupNin-title-container'>
              <h1 className='heading'>Login</h1>
              <img
                src='/images/closeIcon.png'
                onClick={() => setShowLogin(false)}
              />
            </div>
            <form onSubmit={userLogin}>
              {/* <div className='errorMessage'>{errMsg}</div> */}
              <div className='form-row'>
                <label>Email</label>
                <input
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  onChange={e => setEmail(e.target.value)}
                  required
                  title='enter a valid email address'
                />
              </div>
              <div className='form-row'>
                <label>Password</label>
                <input
                  type='password'
                  value={password}
                  placeholder='Enter password'
                  required
                  pattern='.{6,}'
                  title='6 characters minimum'
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className='form-row'>
                <button type='submit'>Log In</button>
              </div>
              <div className='form-footer'>
                <p
                  onClick={() => {
                    setShowLogin(false)
                    setShowRegister(true)
                  }}
                >
                  Dont have an account,click here to Register
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
