export default (state = { trains: [], fares: [], stations:[]}, action) => {
  let newObj = Object.assign({}, state);
  switch (action.type) {
    case 'getTHSRIndex':
      newObj['trains'] = action.trains
      return newObj
      // return { trains: action.trains, fares: state.fares, stations: state.stations }
    case 'getTHSRFares':
      newObj['statifaresons'] = action.fares
      return newObj
    case 'getStations':
      newObj['stations'] = action.stations
      return newObj
      // { trains: state.trains, fares: state.fares, stations: action.stations }
    default:
      return state
  }
}