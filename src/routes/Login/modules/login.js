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
<<<<<<< HEAD
    return axios.post(`${API_URL}/login`, {username, password})
      .then((res) => {
        console.log('login res: ', res);
        dispatch({
          type    : LOGIN_SUCCESS,
          payload : res.data
        })
=======
    return new Promise((resolve, reject) => {
      let HARD_CODE = {
        privateKey: '54c45f4ca9b1c6d5ea9604dd0c1e023b647655006d2208ac73031962612d4150',
        username: 'foo_bar'
      }
      resolve(HARD_CODE)
    })
    .then((creds) => {
      dispatch({
        type    : LOGIN_SUCCESS,
        payload : creds
>>>>>>> 404c9bf83b21068275931f47864e2e232997c6c4
      })
    });
    // return axios.post(`${API_URL}/login`, {username, password})
    //   .then((res) => {
    //     console.log('login res: ', res);
    //     dispatch({
    //       type    : LOGIN_SUCCESS,
    //       payload : HARD_CODE
    //     })
    //   })
    //   .catch((err) => {
    //     console.log('login err: ', err);
    //     return new Promise((resolve) => {
    //       dispatch({
    //         type    : LOGIN_ERROR,
    //         payload : err
    //       });
    //     });
    //   });
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
