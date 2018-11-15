const baseUrl = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/`

export default {
  getStations(callback) {
    fetch(
      `${baseUrl}Station?$top=30&$format=JSON`
    ).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          callback(data)
        })
      } else {
        alert('伺服器異常請聯絡相關人員')
      }
    })
  },
  getList(params, callback) {
    fetch(
      `${baseUrl}DailyTimetable/OD/${params.startStationId}/to/${params.endStationId}/${params.rideDate}`
    ).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          if(data <= 0){
            alert('日期或起迄站選擇錯誤')
          }
          callback(data)
        })
      } else {
        alert('伺服器異常請聯絡相關人員')
      }
    })
  },
  getFareList(params, callback) {
    fetch(
      `${baseUrl}ODFare/${params.startStationId}/to/${params.endStationId}`).then(
      function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            callback(data)
          })
        } else {
          alert('伺服器異常請聯絡相關人員')
        }
      }
    )
  },
  getAvaliableSeat(params, callback) {
    fetch(`${baseUrl}AvailableSeatStatusList/${params.startStationId}`).then(
      function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            callback(data[0].AvailableSeats)
          })
        } else {
          callback('Avaliable seat list is not found')
        }
      }
    )
  }
}