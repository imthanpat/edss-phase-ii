
import axios from 'axios'
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT
const PHP_SERVICE = process.env.VUE_APP_PHP_SERVICE;

export default {
  PhpDeviceAlarmLogList () {
    return axios.get('http://119.31.121.151/data/pages/device_alarm_logs.php')
      .then(response => {
        return response.data
      })
  },
  PhpDeviceAlarmLogListV2 (page,limit,sortBy,sortType,startDate,endDate,typeCode) {
    return axios.get('http://119.31.121.151/data/pages/dev_device_alarm_logs.php?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortType=' + sortType + '&typeCode=' + typeCode)
      .then(response => {
        return response.data
      })
  },
  PhpStackedBarChartInfo (startDate,endDate,typeCode){
    return axios.get('http://119.31.121.151/data/pages/calculate_device_alarm_logs.php?startDate=' + startDate + '&endDate=' + endDate + '&typeCode=' + typeCode)
      .then(response => {
        return response.data
      })
  }
}