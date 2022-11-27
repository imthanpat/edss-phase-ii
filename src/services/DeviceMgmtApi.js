import axios from 'axios'
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT
const PHP_SERVICE = process.env.VUE_APP_PHP_SERVICE;

export default {
    DeviceList(projectId, types) {
        console.log(process.env);
        return axios.get(`${PHP_SERVICE}/data/pages/device_list.php?project_id=${projectId}&type=${types}`)
            .then(response => {
                return response.data
            })
    },
    DeviceListEDSS(projectId, types) {
        return axios.get(`${PHP_SERVICE}/data/pages/device_list.php?project_id=${projectId}&type=${types}`)
            .then(response => {
                return response.data
            })
    },
    GetServerScope (deviceId) {
        return axios.get(`${HOSTNAME}/api/plugins/telemetry/DEVICE/`+ deviceId +'/values/attributes/SERVER_SCOPE', {
          headers: {
            "X-Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then(response => {
            return response.data
          })
    },
    GetSharedScope (deviceId) {
        return axios.get(`${HOSTNAME}/api/plugins/telemetry/DEVICE/`+ deviceId +'/values/attributes/SHARED_SCOPE', {
          headers: {
            "X-Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then(response => {
            return response.data
          })
    },
}