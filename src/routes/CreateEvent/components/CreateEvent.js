import React, { Component } from 'react'
import './CreateEvent.scss'

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: null, // TODO: Force to int
      price: null // TODO: Force to int
    };
  }

  onSubmit() {
    this.props.createEvent(this.state.name, this.state.qty, this.state.price)
      .then(() => {

      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    console.log('this.props: ', this.props);
    return (
      <div className='container' >
        <h1>Create Event</h1>
        <label className='label'>
          <span>Username:</span>
          <input type="text" value={this.state.username} onChange={(e) => {
            console.log('e.target.value: ', e.target.value);
            this.setState({username: e.target.value});
          }} />
        </label>
        <label className='label'>
          <span>Password:</span>
          <input type="text" value={this.state.password} onChange={(e) => {
            this.setState({password: e.target.value})
          }} />
        </label>
        <span className='error'>{(this.props.loginError) ? this.props.loginError : null}</span>
        <span className='user'>{(this.props.user) ? this.props.user : null}</span>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default CreateEvent
