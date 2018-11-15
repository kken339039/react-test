import THSRApis from '../services/THSRApis'

export function getTHSRIndex(params) {
  return dispatch => {
    THSRApis.getIndex(params, function (data) {
      dispatch({ type: 'getTHSRIndex', trains: data })
    })
    THSRApis.getFareList(params, function(data) {
      dispatch({ type: 'getTHSRFares', fares: data })
    })
  }
}
