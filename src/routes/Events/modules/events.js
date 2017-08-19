import axios from 'axios';
import Web3 from 'web3';
import pasync from 'pasync';
import { utils } from 'web3';
utils.toAsciiOriginal = utils.toAscii;
utils.toAscii = function(input) { return utils.toAsciiOriginal(input).replace(/\u0000/g, '') };

let web3 = new Web3(new Web3.providers.HttpProvider(WEB3_ADDRESS));

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
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
    const { abis, terrapinAddr } = getState().events;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddr);
    return new Promise((resolve, reject) => {
      terrapinInstance.methods.getEvents().call({from: '0x5d45ab7cc622298ef32de3cca7f8dc5a45c296d5'}, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    })
    .then((eventAddrs) => {
      let eventInstances = [];

      return pasync.eachSeries(eventAddrs, (eventAddr) => {
        let eventInstance = getContractInstance(abis.event.abi, eventAddr);
        eventInstances.push(eventInstance);
        return eventInstance.methods.name().call({from: '0x5d45ab7cc622298ef32de3cca7f8dc5a45c296d5'})
          .then((name) => {
            console.log('name: ', utils.toAscii(name));
          })
      });
    })
  }
}

export const getContractInfo = () => {
  return (dispatch, getState) => {
    return axios.get(`${API_URL}/contract-info`)
      .then((res) => {
        dispatch({
          type: SET_CONTRACT_INFO,
          payload: res.data
        })
      });
  }
}

export const clickBuyTicket = () => {
  return (dispatch, getState) => {
    // TODO: Update this
    web3.getsomething
    return axios.post(`${API_URL}/login`, {username, password})
      .then((res) => {
        console.log('res: ', res);
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
      });
  }
}

export const actions = {
  getEvents,
  clickBuyTicket,
  buyTicket,
  getContractInfo
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
      abis: JSON.parse(action.payload.abis),
      terrapinAddr: action.payload.terrapinAddr
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    events: null,
    abis: null,
    terrapinAddr: null
}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
