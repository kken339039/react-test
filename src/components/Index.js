import React, { Component } from 'react'
import UserForm from './UserForm'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUrl: props.match.url,
      sortType: 'asc'
    }

    this.toggleSort = this.toggleSort.bind(this)
  }

  toggleSort() {
    const sort = this.state.sortType == 'asc' ? 'desc' : 'asc'
    this.setState({ sortType: sort })
  }

  render() {
    const { trains, fares, searchClick, onClickMinus } = this.props
    const price = fares ? fares[0].Fares[0].Price : 0
    const dataDatble = checkTableData(trains, price, this.state.sortType, this.toggleSort)

    trains.forEach(train => {
      train.costTime = calcucateTime(train)
    })
    trains.sort((a, b) => {
      return this.state.sortType === 'asc' ? a.costTime - b.costTime : b.costTime - a.costTime
    })

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

function checkTableData(trains, price, sort, toggleSort) {
  if (trains.length > 0) {
    return <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>起站名稱</th>
              <th>起站發車時間</th>
              <th>訖站名稱</th>
            <th onClick={toggleSort}>
                總共乘車時間
                <span className={`fa-${sort}`} />
              </th>
              <th>票價</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => <tr key={index}>
                <td>{train.OriginStopTime.StationName.Zh_tw}</td>
                <td>{train.OriginStopTime.DepartureTime}</td>
                <td>{train.DestinationStopTime.StationName.Zh_tw}</td>
                <td>{train.costTime} 分鐘</td>
                <td>{price}元</td>
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

function mapStateToProps(state) {
  return { trains: state.trains, fares: state.fares }
}

function mapDispatchToProps(dispatch) {
  return { searchClick: params => dispatch(actions.getTHSRIndex(params)) }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
