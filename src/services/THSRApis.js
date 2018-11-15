const baseUrl = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/`

export default {
  getStations(callback) {
    fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Station?$top=30&$format=JSON`
    ).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          callback(data)
        })
      } else {
        callback("Stations list is not found")
      }
    })
  },
  getList(params, callback) {
    fetch(baseUrl + `DailyTimetable/OD/${params.startStationId}/to/${params.endStationId}/${params.rideDate}`)
    .then(function(response){
      if(response.ok){
        response.json().then(function(data){
          callback(data)
        })
      }else{
        callback("Trains list is not found")
      }
    })
  },
  getFareList(params, callback) {
    fetch(baseUrl + `ODFare/${params.startStationId}/to/${params.endStationId}`).then(
      function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            callback(data)
          })
        } else {
          callback('Fares list is not found')
        }
      }
    )
  },
  getDaily(params){
    return fetch(baseUrl + `AvailableSeatStatusList/${params.startStationId}?$top=30&$format=JSON`)
  }
}