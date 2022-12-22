import axios from "axios";
const HOSTNAME = process.env.VUE_APP_ENDPOINT; // process.env.API_ENDPOINT
const PHP_SERVICE = process.env.VUE_APP_PHP_SERVICE;

export default {
  ChartInfo() {
    return axios.get(`${PHP_SERVICE}/data/pages/chart_info.php`)
        .then(response => {
            return response.data
        })
  },
  DeviceList(projectId, types) {
    return axios.get(`${PHP_SERVICE}/data/pages/device_list.php?project_id=${projectId}&type=${types}`)
        .then(response => {
            return response.data
        })
  },
  DeviceListII(projectId, types, page, limit, sortBy) {
    let typeCode = "";
    if (types == "A-Box") {
      typeCode = "10000";
    } else if (types == "W-Box") {
      typeCode = "01000";
    } else if (types == "VA-Box") {
      typeCode = "00100";
    } else if (types == "R-Box") {
      typeCode = "00010";
    } else if (types == "TH-Box") {
      typeCode = "00001";
    } else {
      typeCode = "11111";
    }

    return axios
      .get(
        `${PHP_SERVICE}/data/pages/device_list_ii.php?project_id=${projectId}&typeCode=${typeCode}&page=${page}&limit=${limit}&sortBy=${sortBy}`
      )
      .then((response) => {
        return response.data;
      });

    // return axios.get(`${PHP_SERVICE}/data/pages/device_list.php?project_id=${projectId}&type=${type}`)
    //     .then(response => {
    //         return response.data
    //     })
  },
  DeviceListEDSS(projectId, types) {
    return axios
      .get(
        `${PHP_SERVICE}/data/pages/device_list.php?project_id=${projectId}&type=${types}`
      )
      .then((response) => {
        return response.data;
      });
  },
  DeviceListFilter(projectId, typeCode) {
    return axios
      .get(
        `${PHP_SERVICE}/data/pages/device_list.php?project_id=${projectId}&type=All&typeCode=${types}`
      )
      .then((response) => {
        return response.data;
      });
  },
  GetServerScope(deviceId) {
    return axios
      .get(
        `${HOSTNAME}/api/plugins/telemetry/DEVICE/` +
          deviceId +
          "/values/attributes/SERVER_SCOPE",
        {
          headers: {
            "X-Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  },
  GetSharedScope(deviceId) {
    return axios
      .get(
        `${HOSTNAME}/api/plugins/telemetry/DEVICE/` +
          deviceId +
          "/values/attributes/SHARED_SCOPE",
        {
          headers: {
            "X-Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  },
  SetServerScope(deviceId, body) {
    return axios
      .post(
        `${HOSTNAME}/api/plugins/telemetry/DEVICE/` +
          deviceId +
          "/SERVER_SCOPE",
        body,
        {
          headers: {
            "X-Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  },
  SetSharedScope(deviceId, body) {
    return axios
      .post(
        `${HOSTNAME}/api/plugins/telemetry/DEVICE/` +
          deviceId +
          "/SHARED_SCOPE",
        body,
        {
          headers: {
            "X-Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  },
  GetStatusOverview(projectId, types) {
    return axios
      .get(
        `${PHP_SERVICE}/data/pages/sensor_overview.php?project_id=${projectId}&type=${types}`
      )
      .then((response) => {
        return response.data;
      });
  },
  FindDevice(searchTxt) {
    return axios
      .get(`${PHP_SERVICE}/data/pages/find_device.php?searchinfo=${searchTxt}`)
      .then((response) => {
        return response.data;
      });
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
  FixDashboardUrl(deviceId, projectId) {
    //http://182.52.50.211:18080/api/dashboard/760af2e0-a8ec-11ec-a2c8-b55147006237/customers
    //http://182.52.50.211:18080/api/plugins/telemetry/DEVICE/757e1c30-a8ec-11ec-a2c8-b55147006237/SERVER_SCOPE
    let _payload = {};
    _payload[
      "dashboard-url"
    ] = `${HOSTNAME}/dashboards/${deviceId}?publicId=${projectId}`;
    return axios
      .post(
        `${HOSTNAME}/api/plugins/telemetry/DEVICE/` +
          deviceId +
          "/SERVER_SCOPE",
        _payload,
        {
          headers: {
            "X-Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  },
  SetDashboard(payload) {
    return axios
      .post(`${HOSTNAME}/api/dashboard`, payload, {
        headers: {
          "X-Authorization": "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        return response.data;
      });
  },
};
