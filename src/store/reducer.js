export default (state = {trains: [], fares: []}, action) => {
  switch (action.type) {
    case 'getTHSRIndex':
    let newObj = state
      return { trains: action.trains, fares: state.fares }
    case 'getTHSRFares':
      return { trains: state.trains, fares: action.fares }
    default:
      return state
  }
}