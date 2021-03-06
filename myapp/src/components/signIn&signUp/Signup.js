import React, { useState, useContext } from 'react'

import { UserContext } from '../context/user/UserContext'
// import { setCookie } from '../util/cookies'

export default function Signup () {
  const {
    setShowRegister,
    setShowLogin,
    setIsLoggedIn,
    getCart,
    setUserDetails
  } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const userRegister = async event => {
    event.preventDefault()
    try {
      const response = await window.fetch('/user/', {
        method: 'POST',
        body: JSON.stringify({
          email,
          fullname,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const jsonData = await response.json()
        setEmail('')
        setFullname('')
        setPassword('')
        // setCookie('x-auth-token', jsonData.accessToken)
        setUserDetails(jsonData[0])
        setIsLoggedIn(jsonData[0].id)
        setShowRegister(false)
        getCart()
      } else {
        throw response
      }
    } catch (err) {
      const jsonData = await err.json()
      setEmail('')
      setPassword('')
      setErrorMsg(jsonData.msg)
    }
  }
  return (
    <div>
      <div className='overlay'>
        <div className='signup-container'>
          <div className='form-container'>
            <div className='signupNin-title-container'>
              <h1 className='heading'>Register</h1>
              <img
                src='/images/closeIcon.png'
                onClick={() => setShowRegister(false)}
              />
            </div>
            <form onSubmit={userRegister}>
              <div className='errorMessage'>{errorMsg}</div>
              <div className='form-row'>
                <label>Full Name</label>
                <input
                  value={fullname}
                  placeholder='Enter Full Name'
                  onChange={e => setFullname(e.target.value)}
                  required
                  title='enter a valid email address'
                />
              </div>
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
                <button type='submit'>Register</button>
              </div>
              <div className='form-footer'>
                <p
                  onClick={() => {
                    setShowLogin(true)
                    setShowRegister(false)
                  }}
                >
                  If already registered user, click here to Login
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
