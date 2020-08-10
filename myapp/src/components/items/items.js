import React from 'react'

export default function items (props) {
  return <div>{props.match.params.shopname}</div>
}
