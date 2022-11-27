import axios from 'axios'
const HOSTNAME = process.env.PHP_SERVICE_ENDPOINT; // process.env.API_ENDPOINT

export default {

  ServerStatus () {
    return axios.get(`http://119.31.121.151/data/pages/status_mornitor.php`)
      .then(response => {
        return response.data
      })
  }
}