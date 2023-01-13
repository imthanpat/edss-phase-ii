import axios from 'axios'
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT
const PHP_SERVICE = process.env.VUE_APP_PHP_SERVICE;

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
  },
  PhpProjectList () {
    return axios.get(`${PHP_SERVICE}/data/pages/project_list.php`)
      .then(response => {
        return response.data
      })
  },
  PhpProjectListEDSS () {
    return axios.get(`${PHP_SERVICE}/data/pages/project_list.php`)
      .then(response => {
        return response.data
      })
  },
  MoveDeviceToNewProject (payload) {
    return axios.post(`${HOSTNAME}/api/customer/`+ payload, {},{
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  },
  SetNameProject (payload) {
    return axios.post(`${HOSTNAME}/api/customer`, payload,{
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  },
  SetServerScope (projectId, body) {
    return axios.post(`${HOSTNAME}/api/plugins/telemetry/CUSTOMER/`+ projectId +'/SERVER_SCOPE', body,{
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  },
  PhpMakePojectPublic (projectId) {
    return axios.post(`${PHP_SERVICE}/data/pages/make_public.php?project_id=${projectId}`)
      .then(response => {
        return response.data
      })
  },
  DeleteProject (projectId) {
    return axios.delete(`${HOSTNAME}/api/customer/${projectId}`,{
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  },
  GetProjectDashboard (dashboardId) {
    return axios.get(`${HOSTNAME}/api/dashboard/${dashboardId}`, {
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  },
  SetProjectLayout (payload) {
    return axios.post(`${HOSTNAME}/api/dashboard`, payload, {
      headers: {
        "X-Authorization": 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        return response.data
      })
  },
  FixDashboardIssue(dashboardId, projectId) {
    //http://182.52.50.211:18080/api/dashboard/760af2e0-a8ec-11ec-a2c8-b55147006237/customers
    let _payload = [projectId];
    return axios
      .post(`${HOSTNAME}/api/dashboard/${dashboardId}/customers`, _payload, {
        headers: {
          "X-Authorization": "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        return response.data;
      });
  },
}