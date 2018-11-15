import THSRApis from '../services/THSRApis'

export function getTHSRIndex(params) {
  return dispatch => {
    THSRApis.getList(params, function (data) {
      dispatch({ type: 'getTHSRIndex', trains: data })
    })
    THSRApis.getFareList(params, function(data) {
      dispatch({ type: 'getTHSRFares', fares: data })
    })
  }
}

export function getTHSRDaily(params) {
  return dispatch => {
    THSRApis.getList(params, function(data) {
      dispatch({ type: 'getTHSRIndex', trains: data })
    })
    THSRApis.getFareList(params, function (data) {
      dispatch({ type: 'getTHSRFares', fares: data })
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
