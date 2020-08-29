import React, { useState } from 'react'

export default function Signin () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <div className='overlay'>
        <div className='signin-container'>
          <div className='form-container'>
            <h1 className='heading'>Login</h1>
            <form>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
