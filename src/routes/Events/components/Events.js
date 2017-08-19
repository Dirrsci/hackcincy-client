import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Events.scss'

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        { id: 1, name: 'Phish @ MSG', qty: 50, price: 50 },
        { id: 2, name: 'Dead & Co @ Wrigley Field', qty: 50, price: 50 },
        { id: 3, name: 'String Cheese Incident @ Electric Forest', qty: 50, price: 50 },
        { id: 4, name: 'Widespread Panic @ Red Rocks', qty: 50, price: 50 },
        { id: 5, name: 'Phish @ Loren Airforce Base', qty: 50, price: 50 }
      ]
    };
    this.renderListItem = this.renderListItem.bind(this);
  }

  componentDidMount() {
    this.props.getContractInfo()
      .then((data) => {
        this.props.getEvents();
      });
  }

  buyTicket(id) {
    console.log(`buying ${id}`)
  }

  renderListItem(item) {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.qty}</td>
        <td><button onClick={this.buyTicket(item.id)}>Buy Ticket</button></td>
      </tr>
    )
  }

  render() {
    return (
      <div className='events-container' >
        <table>
          <tbody>
            {this.state.events.map((event, index) => {
              return this.renderListItem(event);
            })}
          </tbody>
        </table>
          Here is some stuff
      </div>
    )
  }
}

export default Events
