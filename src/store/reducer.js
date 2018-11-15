export default (state = { trains: [], fares: null, stations: [], availableSeats: []}, action) => {
  let newObj = Object.assign({}, state);
  switch (action.type) {
    case 'getTHSRIndex':
      newObj['trains'] = action.trains
      return newObj
    case 'getTHSRFares':
      newObj['fares'] = action.fares
      return newObj
    case 'getStations':
      newObj['stations'] = action.stations
      return newObj
    case 'getAvaliableSeat':
      newObj['availableSeats'] = action.availableSeats
      return newObj
    default:
      return state
  }
}