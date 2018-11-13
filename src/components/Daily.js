import React, { Component } from 'react'
import UserForm from './UserForm'

class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUrl: props.match.url }
  }

  render() {
    return <div className="card">
      <UserForm currentUrl={this.state.currentUrl} />
      <div className="card-block">
      </div>
    </div>
  }
}

export default Daily;