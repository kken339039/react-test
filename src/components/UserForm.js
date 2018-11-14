import React, { Component } from 'react'

class UserForm extends Component {
  constructor(props) {
    super(props)
    fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Station?$top=30&$format=JSON`
    )
      .then(res => res.json())
      .then(data => {
        const searchParams = this.state.searchParams
        searchParams['startStationId'] = data[0].StationID
        searchParams['endStationId'] = data[0].StationID

        this.setState({ stations: data, searchParams })
      })
    this.searhClick = this.searhClick.bind(this)
    this.paramsChange = this.paramsChange.bind(this)
    this.state = {
      formType: props.currentUrl,
      stations: [],
      searchParams: {
        rideDate: new Date().toISOString().substr(0, 10),
        startStationId: 0,
        endStationId: 0
      }
    }
  }

  searhClick() {
    const searchParams = this.state.searchParams
    const baseUrl = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/`
    let url = this.state.formType === '/' ?
      `DailyTimetable/OD/${searchParams.startStationId}/to/${searchParams.endStationId}/${searchParams.rideDate}`
      : `AvailableSeatStatusList/1010?$top=30&$format=JSON`
    fetch(baseUrl + url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  paramsChange(name, e) {
    const searchParams = this.state.searchParams
    searchParams[name] = e.target.value

    this.setState({ searchParams })
  }

  render() {
    return (
      <div className="user-form">
        <Form
          propData={this.state}
          searchMethod={this.searhClick}
          paramsChange={this.paramsChange}
        />
      </div>
    )
  }
}

function Form(props) {
  const { formType, searchParams, stations } = props.propData
  const { searchMethod, paramsChange, checkDateDisabled } = props

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

export default UserForm
