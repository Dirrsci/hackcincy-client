import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Events.scss'

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    this.props.getContractInfo()
      .then((data) => {
        this.props.getEvents();
      });
  }

  render() {
    return (
      <div className='events-container' >
          Here is some stuffff
      </div>
    )
  }
}

export default Events
