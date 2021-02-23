import React, { useReducer, createContext } from 'react'
import { getCookie } from '../../util/cookies'
import DeliveryReducer from './DeliveryReducer'

export const DeliveryContext = createContext()

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(DeliveryReducer, initialState)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [deliveryUserDetails, setDeliveryUserDetails] = useState(null)

  useEffect(() => {
    const token = getCookie('deliveryguy-token')
    if (token) {
      getDeliveryUser()
    }
  }, [])
  useEffect(() => {
    getCart()
  }, [isLoggedIn])

  const getDeliveryUser = async shopid => {
    try {
      const data = await request(`items/${shopid}`, 'GET')
      if (!data.ok) {
        throw data
      }
      const jsonData = await data.json()
      dispatch({ type: 'GET_ITEMS', payload: jsonData })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  // async function getUser () {
  //   const data = await request('user/getUser', 'GET')
  //   const jsonData = await data.json()
  //   setDeliveryUserDetails(jsonData)
  //   setIsLoggedIn(jsonData.userid)
  // }

  return (
    <DeliveryContext.Provider
      value={{
        isLoggedIn,
        deliveryUserDetails,
        setIsLoggedIn
      }}
    >
      {props.children}
    </DeliveryContext.Provider>
  )
}
