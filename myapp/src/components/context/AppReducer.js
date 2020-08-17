export default (state, action) => {
  switch (action.type) {
    case 'GET_ITEMS': {
      return { ...state, items: action.payload }
    }
    case 'GET_CART': {
      return {
        ...state,
        cart: action.payload
      }
    }
    case 'ADD_TO_CART': {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    case 'DELETE_ITEM_FROM_CART': {
      return {
        ...state,
        cart: state.cart.map(c => c.cartid !== action.payload.cartid)
      }
    }
    case 'DECREMENT_ITEMCOUNT_FROM_CART': {
      const newCart = state.cart.map(cartItem => {
        if (cartItem.cartid === action.payload.cartid) {
          cartItem.cartItemquantity--
          return cartItem
        }
        return cartItem
      })
      return {
        ...state,
        cart: [newCart]
      }
    }
    case 'INCREMENT_ITEMCOUNT_FROM_CART': {
      const newCart = state.cart.map(cartItem => {
        if (cartItem.cartid === action.payload.cartid) {
          cartItem.cartItemquantity++
          return cartItem
        }
        return cartItem
      })
      return {
        ...state,
        cart: [newCart]
      }
    }
  }
}
