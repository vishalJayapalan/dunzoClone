export default (state, action) => {
  switch (action.type) {
    case 'GET_ITEMS': {
      return { ...state, items: action.payload }
    }
    case 'UPDATE_ITEMS': {
      const updatedItems = action.payload.items
      const toUpdateItems = action.payload.newItems.reverse()
      for (const item of toUpdateItems) {
        const newItem = { ...item }
        newItem.subcategory = 'Search Results'
        updatedItems.unshift(newItem)
      }
      return { ...state, items: updatedItems }
    }
    case 'GET_CART': {
      console.log('payload', action.payload)

      return {
        ...state,
        cart: action.payload
      }
    }
    case 'ADD_TO_CART': {
      return {
        ...state,
        cart: [...state.cart, ...action.payload]
      }
    }
    case 'DELETE_ITEM_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(
          cartItem => cartItem.cartid !== action.payload.cartid
        )
      }
    }
    case 'DELETE_ALL_ITEM_FROM_CART': {
      return {
        ...state,
        cart: []
      }
    }
    case 'DECREMENT_ITEMCOUNT_FROM_CART': {
      const newCart = state.cart.map(cartItem => {
        if (cartItem.cartid === action.payload.cartid) {
          const newCartItem = { ...cartItem }
          newCartItem.cartitemquantity--
          return newCartItem
        }
        return cartItem
      })
      return {
        ...state,
        cart: newCart
      }
    }
    case 'INCREMENT_ITEMCOUNT_FROM_CART': {
      const newCart = state.cart.map(cartItem => {
        if (cartItem.cartid === action.payload.cartid) {
          const newCartItem = { ...cartItem }
          newCartItem.cartitemquantity++
          return newCartItem
        }
        return cartItem
      })
      return {
        ...state,
        cart: newCart
      }
    }
    case 'ERROR': {
      return {
        ...state,
        'ERROR: ': action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
