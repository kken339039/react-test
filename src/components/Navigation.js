import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return <div className = "navigation" >
      <ul className="nav">
        <li>
          <Link to={'/'} className="nav-link" >
            <span className="">列車查詢</span>
          </Link>
        </li>
        <li>
          <Link to={'/daily'} className="nav-link" >
            <span className="">當日查詢</span>
          </Link>
        </li>
      </ul>
  </div >
  }
}

export default Navigation