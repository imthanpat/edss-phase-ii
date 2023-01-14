
import axios from 'axios'
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT
const PHP_SERVICE = process.env.VUE_APP_PHP_SERVICE;

export default {
  PhpDeviceAlarmLogList () {
    return axios.get(`${PHP_SERVICE}/data/pages/device_alarm_logs.php`)
      .then(response => {
        return response.data
      })
  },
  PhpDeviceAlarmLogListV2 (page,limit,sortBy,sortType,startDate,endDate,typeCode) {
    return axios.get(`${PHP_SERVICE}/data/pages/dev_device_alarm_logs.php?startDate=` + startDate + `&endDate=` + endDate + `&page=` + page + `&limit=` + limit + `&sortBy=` + sortBy + `&sortType=` + sortType + `&typeCode=` + typeCode)
      .then(response => {
        return response.data
      })
  },
  PhpDeviceAlarmLogListV3 (page,limit,sortBy,sortType,startDate,endDate,typeCode,selSearch,keyword) {
    return axios.get(`${PHP_SERVICE}/data/pages/dev2_device_alarm_logs.php?startDate=` + startDate + `&endDate=` + endDate + `&page=` + page + `&limit=` + limit + `&sortBy=` + sortBy + `&sortType=` + sortType + `&typeCode=` + typeCode + '&selSearch=' + selSearch + '&keyword=' + keyword)
      .then(response => {
        return response.data
      })
  },
  PhpStackedBarChartInfoV3 (startDate,endDate,typeCode,selSearch,keyword){
    return axios.get(`${PHP_SERVICE}/data/pages/dev2_calculate_device_alarm_logs.php?startDate=` + startDate + `&endDate=` + endDate + `&typeCode=` + typeCode + '&selSearch=' + selSearch + '&keyword=' + keyword)
      .then(response => {
        return response.data
      })
  },
  PhpStackedBarChartInfo (startDate,endDate,typeCode){
    return axios.get(`${PHP_SERVICE}/data/pages/calculate_device_alarm_logs.php?startDate=` + startDate + `&endDate=` + endDate + `&typeCode=` + typeCode)
      .then(response => {
        return response.data
      })
  },
  PhpFmAlarmLogList (page,limit,sortBy,sortType,startDate,endDate,typeCode,selSearch,keyword) {
    return axios.get(`${PHP_SERVICE}/data/pages/dev2_fm_alarm_logs.php?startDate=` + startDate + `&endDate=` + endDate + `&page=` + page + `&limit=` + limit + `&sortBy=` + sortBy + `&sortType=` + sortType + `&typeCode=` + typeCode + '&selSearch=' + selSearch + '&keyword=' + keyword)
      .then(response => {
        return response.data
      })
  },
  PhpStackedBarChartFmInfo (startDate,endDate,typeCode,selSearch,keyword){
    return axios.get(`${PHP_SERVICE}/data/pages/dev2_calculate_fm_alarm_logs.php?startDate=` + startDate + `&endDate=` + endDate + `&typeCode=` + typeCode + '&selSearch=' + selSearch + '&keyword=' + keyword)
      .then(response => {
        return response.data
      })
  },
}