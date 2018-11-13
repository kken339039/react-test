import React, { Component } from 'react'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formType: props.currentUrl,
      searchParams: {
        rideDate: new Date().toISOString().substr(0, 10),
        startStationId: null,
        endStationId: null
      }
    }
  }

  render() {
    return (
      <div className="user-form">
        <Form propData={this.state} />
      </div>
    )
  }
}

function IndexColumn(props) {
  const { searchParams } = props

  return <div>
      <label>
        乘車日期:
        <input type="date" defaultValue={searchParams.rideDate} />
      </label>
      <label>
        起站:
        <input type="number" defaultValue={searchParams.startStationId} />
      </label>
      <label>
        訖站:
        <input type="number" defaultValue={searchParams.endStationId} />
      </label>
      <SearchButton />
    </div>
}

function DailyColumn(props) {
  return <div />
}

function SearchButton(props) {
  return <button type="button">Click Me!</button>
}

function Form(props) {
  const { formType, searchParams } = props.propData
  if (formType === '/') {
    return <IndexColumn searchParams={searchParams} />
  }
  return <DailyColumn />
}

export default UserForm
