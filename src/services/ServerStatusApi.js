import axios from 'axios'
const PHP_SERVICE = process.env.VUE_APP_PHP_SERVICE;

export default {

  ServerStatus () {
    return axios.get(`${PHP_SERVICE}/data/pages/status_mornitor.php`)
      .then(response => {
        return response.data
      })
  }
}