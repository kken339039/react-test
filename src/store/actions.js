import THSRApis from '../services/THSRApis'

export function getTHSRIndex(params) {
  return dispatch => {
    THSRApis.getList(params, function (data) {
      const result = data ? data : []
      dispatch({ type: 'getTHSRIndex', trains: result })
    })
    THSRApis.getFareList(params, function(data) {
      const result = data.length > 0 ? data : null
      dispatch({ type: 'getTHSRFares', fares: result })
    })
  }
}

export function getStations() {
  return dispatch => {
    THSRApis.getStations(function(data) {
      dispatch({ type: 'getStations', stations: data })
    })
  }
}

export function getAvaliableSeat(params) {
  return dispatch => {
    THSRApis.getAvaliableSeat(params, function(data) {
      dispatch({ type: 'getAvaliableSeat', availableSeats: data })
    })
  }
}
