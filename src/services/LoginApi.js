import axios from 'axios'
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT
const PHP_SERVICE = process.env.VUE_APP_PHP_SERVICE;

export default {

  AuthenEDSS (data) {
    return axios.post(`${HOSTNAME}/api/auth/login`, data)
      .then(response => {
        return response.data
      })
  },
  UserList (sysadminToken, tenantId, textSearch) {
    return axios.get(
        `${HOSTNAME}/api/tenant/${tenantId}/users?limit=100&textSearch=${textSearch}`,
        {
          headers: {
            "X-Authorization": "Bearer " + sysadminToken,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  },
  ActivityLogs() {
    return axios.get(`${PHP_SERVICE}/data/pages/api_activity_log_get.php`)
        .then(response => {
            return response.data
        })
  }
}