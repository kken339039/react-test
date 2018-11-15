import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class UserForm extends Component {
  constructor(props) {
    super(props)

    props.getStations()
    const stations = props.stations
    this.searhClick = this.searhClick.bind(this)
    this.paramsChange = this.paramsChange.bind(this)
    this.state = {
      formType: props.currentUrl,
      searchParams: {
        rideDate: new Date().toISOString().substr(0, 10),
        startStationId: 0,
        endStationId: 0
      }
    }

    // if (stations.length > 0) {
    //   this.state.searchParams.startStationId = stations[0].StationID
    //   this.state.searchParams.endStationId = stations[0].StationID
    // }
  }

  searhClick() {
    const searchParams = this.state.searchParams
    this.props.searchTHSRMethod(searchParams)
  }

  paramsChange(name, e) {
    const searchParams = this.state.searchParams
    searchParams[name] = e.target.value

    this.setState({ searchParams })
  }

  componentWillReceiveProps(nextProps) {
    const stations = nextProps.stations
    const searchParams = this.state.searchParams

    if (nextProps.stations.length > 0) {
      searchParams['startStationId'] = stations[0].StationID
      searchParams['endStationId'] = stations[0].StationID
      this.setState({ searchParams });
    }
  }

  render() {
    const stations = this.props.stations

    return (
      <div className="user-form">
        <Form
          propData={this.state}
          stations={stations}
          searchMethod={this.searhClick}
          paramsChange={this.paramsChange}
        />
      </div>
    )
  }
}

function Form(props) {
  const { formType, searchParams} = props.propData
  const { searchMethod, paramsChange, checkDateDisabled, stations } = props

  return <IndexColumn searchParams={searchParams} stations={stations} searchMethod={searchMethod} paramsChange={paramsChange} formType={formType} />
}

function IndexColumn(props) {
  const { searchParams, stations, searchMethod, paramsChange, formType } = props

  return <div>
      <div className="basic-column">
        <label>
          乘車日期:
          <input type="date" value={searchParams.rideDate} onChange={e => paramsChange('rideDate', e)} disabled={formType !== "/"} />
        </label>
        <label>
          起站:
          <select value={searchParams.startStationId} onChange={e => paramsChange('startStationId', e)}>
            {stations.map(station => (
              <option key={station.StationID} value={station.StationID}>
                {station.StationName.Zh_tw}
              </option>
            ))}
          </select>
        </label>
        <label>
          訖站:
          <select value={searchParams.endStationId} onChange={e => paramsChange('endStationId', e)}>
            {stations.map(station => (
              <option key={station.StationID} value={station.StationID}>
                {station.StationName.Zh_tw}
              </option>
            ))}
          </select>
        </label>
      </div>
      <SearchButton searchMethod={searchMethod} />
    </div>
}

function SearchButton(props) {
  const { searchMethod } = props
  return (
    <div className="search-button">
      <button className="primary" type="button" onClick={searchMethod}>
        查詢
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return { stations: state.stations }
}

function mapDispatchToProps(dispatch) {
  return {
    searchClick: params => dispatch(actions.getTHSRIndex(params)),
    getStations: () => dispatch(actions.getStations()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)
