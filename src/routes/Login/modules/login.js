import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const login = (username, password) => {
  return (dispatch, getState) => {
    return axios.post(`${API_URL}/login`, {username, password})
      .then((res) => {
        console.log('login res: ', res);
        dispatch({
          type    : LOGIN_SUCCESS,
          payload : res.user
        })
      })
      .catch((err) => {
        console.log('login err: ', err);
        return new Promise((resolve) => {
          dispatch({
            type    : LOGIN_ERROR,
            payload : err
          });
        });
      });
  }
}

export const actions = {
  login
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]  : (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  },
  [LOGIN_ERROR]  : (state, action) => {
    return {
      ...state,
      loginError: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: null,
    loginError: null
}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
