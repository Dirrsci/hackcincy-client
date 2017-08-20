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
export const SET_EVENTS = 'SET_EVENTS'

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getEvents = () => {
  return (dispatch, getState) => {
    // TODO: Update this
    const { abis, terrapinAddr } = getState().events;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddr);
    return Promise.resolve()
      .then(() => terrapinInstance.methods.getEvents().call())
      .then((eventAddrs) => {
        let eventInstances = [];

        return pasync.eachSeries(eventAddrs, (eventAddr) => {
          let eventInstance = getContractInstance(abis.event.abi, eventAddr);
          // tickets, name
          let eventObj = { address: eventAddr };
          return Promise.resolve()
            .then(() => eventInstance.methods.owner().call())
            .then((owner) => {
              eventObj.owner = owner;
            })
            .then(() => eventInstance.methods.name().call())
            .then((name) => {
              eventObj.name = utils.toAscii(name);
            })
            .then(() => eventInstance.methods.getTickets().call())
            .then((ticketAddrs) => {
              let tickets = [];
              return pasync.eachSeries(ticketAddrs, (ticketAddr) => {
                let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddr);
                let ticketObj = {};
                return ticketInstance.methods.price().call()
                  .then((price) => ticketObj.price = price)
                  .then(() => ticketInstance.methods.owner().call())
                  .then((owner) => ticketObj.owner = owner)
                  .then(() => tickets.push(ticketObj));
              })
              // set this events tickets
              .then(() => eventObj.tickets = tickets)
            })
            .then(() => eventInstances.push(eventObj))
        })
        .then(() => {
          console.log(eventInstances);
          dispatch({
            type: SET_EVENTS,
            payload: eventInstances
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
  },
  [SET_EVENTS]: (state, action) => {
    console.log('action: ', action);
    let events = action.payload.map((event) =>{
      let qty = event.tickets.reduce((sum, ticket) => { if(ticket.owner != event.owner) sum + 1 }, 0);
      return {
        id: event.address
        name: event.name,
        qty: qty,
        price: event.tickets[0].price
      }
    });
    return {
      ...state,
      events: action.payload
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
