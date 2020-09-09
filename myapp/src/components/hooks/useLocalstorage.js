import { useState, useEffect } from 'react'

const PREFIX = 'Donesooo-'

export default function useLocalstorage (key, initialValue) {
  const prefixedkey = PREFIX + key
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedkey)
    if (jsonValue) return JSON.parse([...jsonValue, initialValue])
    return [initialValue]
  })
  useEffect(() => {
    localStorage.setItem(prefixedkey, JSON.stringify(value))
  }, [value, key])
  return [value, setValue]
}
