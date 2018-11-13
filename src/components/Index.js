import React, { Component } from 'react'
import UserForm from './UserForm'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUrl: props.match.url }
  }

  render() {
    return <div className="card">
        <UserForm currentUrl={this.state.currentUrl} />
        <div className="card-block" />
      </div>
  }
}

export default Index;