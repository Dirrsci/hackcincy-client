export const GET_USER_INFO = 'GET_USER_INFO'

export const getUserInfo = () => {
  return (dispatch, getState) => {
    
  }
}

export const actions = {
  getUserInfo
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_USER_INFO]  : (state, action) => {
    return {
      ...state
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: null
}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
