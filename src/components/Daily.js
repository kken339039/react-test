import React, { Component } from 'react'
import UserForm from './UserForm'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class Daily extends Component {
  constructor(props) {
    super(props)
    this.state = { currentUrl: props.match.url }
  }

  render() {
    const { trains, searchClick, fares, availableSeats} = this.props

    const newTrains = filterTrains(trains, availableSeats)
    const dataDatble = checkTableData(newTrains, fares, availableSeats)

    return (
      <div className="card">
        <UserForm
          currentUrl={this.state.currentUrl}
          searchTHSRMethod={searchClick}
        />
        <div className="card-block">{dataDatble}</div>
      </div>
    )
  }
}

function checkTableData(trains, fares, availableSeats) {
  if (trains.length > 0) {
    return <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>起站名稱</th>
              <th>起站發車時間</th>
              <th>訖站名稱</th>
              <th>總共乘車時間</th>
              <th>票價</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => <tr key={index}>
                <td>{train.OriginStopTime.StationName.Zh_tw}</td>
                <td>{train.OriginStopTime.DepartureTime}</td>
                <td>{train.DestinationStopTime.StationName.Zh_tw}</td>
                <td>{train.costTime} 分鐘</td>
               <td>{getSeatPrice(train, fares, availableSeats)}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
  }
  return <h2>暫無資料</h2>
}

function calcucateTime(train) {
  const date = new Date().toISOString().substr(0, 10)
  const start = new Date(`${date} ${train.OriginStopTime.DepartureTime}`)
  const end = new Date(`${date} ${train.DestinationStopTime.ArrivalTime}`)

  return parseInt(end - start) / 1000 / 60
}

function filterTrains(trains, availableSeats) {
  if (trains <= 0 || availableSeats <= 0) {
    return []
  }
  trains.forEach(train => {
    train.costTime = calcucateTime(train)
  })
  trains.filter(train => {
    const currentTrainNO = train.DailyTrainInfo.TrainNo
    const seatInfo = availableSeats.find(seat => {
      return seat.TrainNo == currentTrainNO
    })
    if (!seatInfo){
      return false
    }
    return seatInfo.StopStations.some(info => {
      return info.BusinessSeatStatus !== 'Full' || info.StandardSeatStatus !== 'Full'
    })
  })
  return trains
}

function getSeatPrice(train, fares, availableSeats) {
  const seatInfo = availableSeats.length > 0 ? (availableSeats.find(seat => {
    return seat.TrainNo == train.DailyTrainInfo.TrainNo
  })) : []

  const type = seatInfo ? (seatInfo.StopStations.every(info => {
    return info.StandardSeatStatus === 'Full'
  }) ? '商務' : '標準') : null

  const priceInfo = fares ? (fares[0].Fares.find(fare=>{
    return fare.TicketType === type
  })) : 0

  return `${type}-${(priceInfo ? priceInfo.Price : "")}元`
}

function mapStateToProps(state) {
  return {
    trains: state.trains,
    fares: state.fares,
    availableSeats: state.availableSeats
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchClick: params => dispatch(actions.getTHSRIndex(params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Daily)
