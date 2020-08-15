import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppReducer = () => {
  const [categories, setCategories] = useState([])
  return <AppContext.Provider value={'test'}>{children}</AppContext.Provider>
}
