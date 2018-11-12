import React, { Component } from 'react'
import UserForm from './UserForm'

class Daily extends Component {
  render() {
    return <div className="card">
      <UserForm/>
      <div className="card-block">
      </div>
    </div>
  }
}

export default Daily;