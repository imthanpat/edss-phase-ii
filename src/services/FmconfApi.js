import axios from 'axios'
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT

export default {

  GetProjectList () {
    return axios.get(`${HOSTNAME}/api/customers?limit=40&textSearch=`, {
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  },
  GetListScope (projectId) {
    return axios.get(`${HOSTNAME}/api/plugins/telemetry/CUSTOMER/`+ projectId +'/values/attributes/SERVER_SCOPE', {
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  },
  SetListScope (projectId, body) {
    return axios.post(`${HOSTNAME}/api/plugins/telemetry/CUSTOMER/`+ projectId +'/SERVER_SCOPE', body,{
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  }

}