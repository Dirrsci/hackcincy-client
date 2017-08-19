import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <h1>Terrapin</h1>
    <div className='navigation'>
      <IndexLink to='/' className='nav-item' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
      <Link to='/login' className='nav-item' activeClassName='page-layout__nav-item--active'>Login</Link>
      <Link to='/events' className='nav-item' activeClassName='page-layout__nav-item--active'>Events</Link>
      <Link to='/createEvent' className='nav-item' activeClassName='page-layout__nav-item--active'>Create Event</Link>
      <Link to='/user' className='nav-item' activeClassName='page-layout__nav-item--active'>My Profile</Link>
      <Link to='/counter' className='nav-item' activeClassName='page-layout__nav-item--active'>Counter</Link>
    </div>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
