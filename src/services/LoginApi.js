import axios from 'axios'
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT

export default {

  AuthenEDSS (data) {
    return axios.post(`${HOSTNAME}/api/auth/login`, data)
      .then(response => {
        return response.data
      })
  }
}