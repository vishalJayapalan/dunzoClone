import React, { useEffect, useContext } from 'react'
import { Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { getCookie } from './components/util/cookies'

import { UserContext } from './components/context/user/UserContext'
// import { getCookie } from './components/util/cookies'

export default function PrivateRoute ({ component: Component, ...rest }) {
  const { isLoggedIn } = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  const token = getCookie('x-auth-token')

  useEffect(() => {
    token && history.push(location.pathname)
  }, [])

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  )
}
