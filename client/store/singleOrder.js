import axios from 'axios'

// action types
export const GET_USER_ORDER = 'GET_USER_ORDER'

// action creators
export const getUserOrder = order => ({type: GET_USER_ORDER, order})

// Thunk Creators
export const fetchUserOrder = () => {
  return async dispatch => {
    // initialize order to an empty object - if we do not have an order, we can figure out what to do in terms if localStorage
    let order = {}
    // Get current user
    const userRes = await axios.get('/auth/me')
    const user = userRes.data
    // check to make sure user is not empty
    if (user.id) {
      const orderRes = await axios.get(`/api/users/${user.id}`)
      const orderArray = orderRes.data.orders
      if (orderArray.length) {
        // we get the first value because there will only ever be one active cart at a time. this route loads only the non-purchased cart
        order = orderArray[0]
      }
    }
    dispatch(getUserOrder(order))
  }
}

// reducer
export default function singleOrderReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_ORDER:
      return action.order
    default:
      return state
  }
}
