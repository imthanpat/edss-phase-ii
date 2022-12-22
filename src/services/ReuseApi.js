import axios from 'axios'
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT
const PHP_SERVICE = process.env.VUE_APP_PHP_SERVICE;

export default {

    DebugAisInfo() {
      return axios.get(`${PHP_SERVICE}/data/pages/dev_device_list.php?project_id=245306e0-15f3-11ec-aa9a-51d72ec5acff&type=All`)
          .then(response => {
              return response.data
          })
    },

    ReuseInfo(types, reuseId) {
        return axios.get(`${PHP_SERVICE}/data/pages/reuse_list.php?project_id=${reuseId}&type=${types}`)
            .then(response => {
                return response.data
            })
    },

    GetListScope (deviceId) {
      return axios.get(`${HOSTNAME}/api/plugins/telemetry/DEVICE/`+ deviceId +'/values/attributes/SERVER_SCOPE', {
        headers: {
          "X-Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          return response.data
        })
    },
    SetServerScope (deviceId, body) {
        return axios.post(`${HOSTNAME}/api/plugins/telemetry/DEVICE/` + deviceId + '/SERVER_SCOPE', body,{
          headers: {
            "X-Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then(response => {
            return response.data
          })
      }
}