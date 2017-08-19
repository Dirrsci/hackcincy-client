import React, { Component } from 'react'
import './User.scss'

class User extends Component {
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
        <h1>User</h1>
      </div>
    )
  }
}

export default User
