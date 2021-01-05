export default (state, action) => {
  switch (action.type) {
    case 'GET_ITEMS': {
      return { ...state, items: action.payload }
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
