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
    console.log('this.props: ', this.props);
    return (
      <div className='events-container' >
          Here is some stuff
      </div>
    )
  }
}

export default Events
