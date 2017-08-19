import Web3 from 'web3'
import Abi from './ABI'

let Address = '0x8700a919361091dda2d9c2e36ebc133dbc0b6a12';
let web3 = new Web3(new Web3.providers.HttpProvider(WEB3_ADDRESS));

console.log('web3: ', web3);

let getContractInstance = (abi, address) => {
  const Contract = web3.eth.contract(abi);
  const instance = Contract.at(address);
  return instance;
}

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EVENTS = 'GET_EVENTS'
export const CLICK_BUY_TICKET = 'CLICK_BUY_TICKET'
export const BUY_TICKET = 'BUY_TICKET'
export const SET_CONTRACT_INFO = 'SET_CONTRACT_INFO'

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getEvents = () => {
  return (dispatch, getState) => {
    // TODO: Update this
    let contractInstance = getContractInstance(Abi, Address);
    contractInstance.getEvents.call().then(console.log);

    return axios.post(`${API_URL}/login`, {username, password})
      .then((res) => {
        console.log('login res: ', res);
        dispatch({
          type    : GET_EVENTS,
          payload : res.user
        })
      })
      .catch((err) => {
        console.log('login err: ', err);
      });
  }
}

export const getContractInfo = () => {
  return (dispatch, getState) => {
    return Promise.resolve({
      abi: [],
      terrapinAddr: MASTER_CONTRACT_ADDRESS
    })
    .then((res) => {
      console.log('res: ', res);
      dispatch({
        type: SET_CONTRACT_INFO,
        payload: res
      })
    })
  }
}

export const clickBuyTicket = () => {
  return (dispatch, getState) => {
    // TODO: Update this
    web3.getsomething
    return axios.post(`${API_URL}/login`, {username, password})
      .then((res) => {
        console.log('login res: ', res);
        dispatch({
          type    : CLICK_BUY_TICKET,
          payload : res.user
        })
      })
      .catch((err) => {
        console.log('login err: ', err);
      });
  }
}

export const buyTicket = () => {
  console.log('bought ticket');
  return (dispatch, getState) => {
    // TODO: Update this
    web3.getsomething
      .then((res) => {
        dispatch({
          type    : BUY_TICKET,
          payload : res.ticket
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export const actions = {
  getEvents,
  clickBuyTicket,
  buyTicket
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EVENTS]  : (state, action) => {
    return {
      ...state,
      events: action.payload
    }
  },
  [SET_CONTRACT_INFO]  : (state, action) => {
    return {
      ...state,
      abi: action.payload.abi,
      terrapinAddr: action.payload.terrapinAddr
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    events: null,
    abi: null,
    terrapinAddr: null
}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
