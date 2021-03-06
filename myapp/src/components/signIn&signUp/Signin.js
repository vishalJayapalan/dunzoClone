import React, { useState, useContext } from 'react'

import { UserContext } from '../context/user/UserContext'
// import { setCookie } from '../util/cookies'

export default function Signin () {
  const {
    setShowLogin,
    setShowRegister,
    setIsLoggedIn,
    getCart,
    setUserDetails
  } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const userLogin = async event => {
    event.preventDefault()
    try {
      const response = await window.fetch('/user/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (response.ok) {
        const jsonData = await response.json()
        // setCookie('x-auth-token', jsonData.accessToken)
        setEmail('')
        setPassword('')
        setShowLogin(false)
        setUserDetails(jsonData[0])
        setIsLoggedIn(jsonData[0].id)
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
        <div className='signin-container'>
          <div className='form-container'>
            <div className='signupNin-title-container'>
              <h1 className='heading'>Login</h1>
              <img
                src='/images/closeIcon.png'
                alt='close'
                onClick={() => setShowLogin(false)}
              />
            </div>
            <form onSubmit={userLogin}>
              <div className='errorMessage'>{errorMsg}</div>
              <div className='form-row'>
                <label>Email</label>
                <input
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  pattern='.{6,}'
                  onChange={e => setEmail(e.target.value)}
                  required
                  title='Enter a valid email address with atleast 6 characters'
                />
              </div>
              <div className='form-row'>
                <label>Password</label>
                <input
                  type='password'
                  value={password}
                  placeholder='Enter Password'
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
