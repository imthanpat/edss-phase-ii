<template>
  <v-row align="stretch" class="justify-center align-center">
    <v-col cols="8">
      <v-card>
        <v-card-text>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Type</th>
                <th class="text-left">Online</th>
                <th class="text-left">Offline</th>
                <th class="text-left">Dead</th>
                <th class="text-left">New</th>
                <th class="text-left">Maintanance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.type" @click="selRow(item)">
                <td>
                  <v-chip
                    style="display: grid; width: -webkit-fill-available"
                    size="small"
                    class="ml-5 mr-5 text-center"
                    :variant="item.variant"
                    :color="item.color"
                    label
                    >{{ item.type }}</v-chip
                  >
                </td>
                <td>
                  {{ item.online == 0 ? "-" : item.online + " Device(s)" }}
                </td>
                <td>
                  {{ item.offline == 0 ? "-" : item.offline + " Device(s)" }}
                </td>
                <td>{{ item.dead == 0 ? "-" : item.dead + " Device(s)" }}</td>
                <td>{{ item.new == 0 ? "-" : item.new + " Device(s)" }}</td>
                <td>
                  {{
                    item.maintanance == 0
                      ? "-"
                      : item.maintanance + " Device(s)"
                  }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-alert class="mb-5" border>
        Device Type Status :
        <v-chip size="large" class="text-center" variant="outlined" label
          ><strong>{{ deviceTypeSel }}</strong></v-chip
        >
      </v-alert>
      <div class="chart-wrapper mt-10 mb-10">
        <canvas id="statusOverview" class="chartjs-render-monitor"></canvas>
      </div>
      <v-card class="mt-5">
        <v-card-text>
          <v-alert icon="mdi-cog" variant="outlined" class="mb-5" border
            >Project Threshold Setting</v-alert
          >
          <p class="text-caption mb-5">
            This Feature Effect All Device In Your Project immediately, Be
            Careful
          </p>
          <v-row>
            <v-col cols="12" sm="12">
              <v-row>
                <v-col col="3"
                  ><v-chip class="ma-2" color="warning">
                    Offline
                  </v-chip></v-col
                >
                <v-col col="3"
                  ><v-text-field
                    class="ma-2"
                    v-model="conf.offline.days"
                    label="Days"
                  ></v-text-field
                ></v-col>
                <v-col col="3"
                  ><v-text-field
                    class="ma-2"
                    v-model="conf.offline.hours"
                    label="Hours"
                  ></v-text-field
                ></v-col>
                <v-col col="3"
                  ><v-text-field
                    class="ma-2"
                    v-model="conf.offline.minutes"
                    label="Minutes"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row>
                <v-col col="3"
                  ><v-chip class="ma-2" color="error"> Dead </v-chip></v-col
                >
                <v-col col="3"
                  ><v-text-field
                    class="ma-2"
                    v-model="conf.dead.days"
                    label="Days"
                  ></v-text-field
                ></v-col>
                <v-col col="3"
                  ><v-text-field
                    class="ma-2"
                    v-model="conf.dead.hours"
                    label="Hours"
                  ></v-text-field
                ></v-col>
                <v-col col="3"
                  ><v-text-field
                    class="ma-2"
                    v-model="conf.dead.minutes"
                    label="Minutes"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-action>
          <v-divider />
          <div align="right" class="pa-5">
            <v-btn @click="setThreshold" color="success"  :disabled="btnDisable">
              <span style="color:white;">Submit</span>
            </v-btn>
            <v-btn class="ml-4" @click="fromRaw"> Reset </v-btn>
          </div>
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import ProjectApi from "../../services/ProjectApi";
import DeviceMgmtApi from "../../services/DeviceMgmtApi";
//import Chart from "chart.js/auto";
import "chart.js";

var myChart = null;
export default {
  computed: {
    projectId() {
      return this.$store.state.project.projectId;
    },
  },
  watch: {
    conf: {
      handler(newVal, oldVal) {
        this.btnDisable =JSON.stringify({ ...newVal }) === this.tmpConf;
      },
      deep: true,
    },
    projectId(newvalue, oldvalue) {
      this.createChart();
      this.loadInfo(newvalue);
    },
  },
  methods: {
    
    createChart() {
      let dataStatusChart = {
        labels: ["Dead", "Offline", "Online", "Maintanance"],
        datasets: [
          {
            label: "My First Dataset",
            data: [0, 0, 0, 0],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "#009688",
              "gray",
            ],
            hoverOffset: 4,
          },
        ],
      };

      let _ctxx = document.getElementById("statusOverview");
      let chartStatusxx = new Chart(_ctxx);
      if (chartStatusxx != undefined) {
        chartStatusxx.destroy();
      }

      myChart = new Chart(document.getElementById("statusOverview"), {
        type: "doughnut",
        data: dataStatusChart,
        options: {
          legend: { display: false },
          plugins: {
            legend: { display: false },
          },
          aspectRatio: 1.5,
        },
      });

      document.getElementById("statusOverview").style.display = "none";
    },
    updateChart(item) {
      let _newStatus = [0, 0, 0, 0]; // ["Dead", "Offline", "Online", "Maintanance"]
      _newStatus[0] = item.dead;
      _newStatus[1] = item.offline;
      _newStatus[2] = item.online;
      _newStatus[3] = item.maintanance;

      if (myChart != null) {
        myChart.config.data.datasets[0].data = [
          _newStatus[0] == 0 ? "N/A" : _newStatus[0],
          _newStatus[1] == 0 ? "N/A" : _newStatus[1],
          _newStatus[2] == 0 ? "N/A" : _newStatus[2],
          _newStatus[3] == 0 ? "N/A" : _newStatus[3]
        ];
        myChart.update();
        document.getElementById("statusOverview").style.display = "";
      }
    },
    setThreshold() {
      let _res = {};

      _res.offline_period =
        this.conf.offline.days * 1440 +
        this.conf.offline.hours * 60 +
        this.conf.offline.minutes;

      _res.lost_period =
        this.conf.dead.days * 1440 +
        this.conf.dead.hours * 60 +
        this.conf.dead.minutes;
    
      ProjectApi.SetListScope(this.projectId, _res)
        .then((response) => {
          this.$swal.fire({
            icon: "success",
            title: "Success!",
            text: "Complete",
          });
          this.loadInfo(this.projectId)
        })
        .catch((_err) => {
          console.log(_err);
          let e = _err.response.data;
          if (e.status == 401) {
            console.log("In");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: e.message,
            });
            this.$router.push("/login");
          }
        });
    },
    chgVal() {
      let _offline_raw =
        this.conf.offline.days * 1440 +
        this.conf.offline.hours * 60 +
        this.conf.offline.minutes;
      let _dead_raw =
        this.conf.dead.days * 1440 +
        this.conf.dead.hours * 60 +
        this.conf.dead.minutes;
      this.btnDisable =
        this.conf.offline.raw != _offline_raw || this.conf.dead.raw != _dead_raw
          ? false
          : true;
    },
    fromRaw() {
      this.conf.offline.minutes = this.conf.offline.raw % 60;
      let hours = Math.floor(this.conf.offline.raw / 60);
      this.conf.offline.days = Math.floor(hours / 24);
      this.conf.offline.hours = hours % 24;

      this.conf.dead.minutes = this.conf.dead.raw % 60;
      let _hours = Math.floor(this.conf.dead.raw / 60);
      this.conf.dead.days = Math.floor(_hours / 24);
      this.conf.dead.hours = hours % 24;

      this.tmpConf = JSON.stringify({ ...this.conf });
      this.btnDisable = true;
    },
    selRow(item) {
      // Set Selected
      this.items.forEach((element) => {
        element.variant = "outlined";
      });
      item.variant = "elevated";
      this.deviceTypeSel = item.type;


      this.updateChart(item);
      // Draw Chart
      // let dataStatusChart = {
      //   labels: ["Dead", "Offline", "Online", "Maintanance"],
      //   datasets: [
      //     {
      //       label: "My First Dataset",
      //       data: [item.dead, item.offline, item.online, item.maintanance],
      //       backgroundColor: [
      //         "rgb(255, 99, 132)",
      //         "rgb(255, 159, 64)",
      //         "#009688",
      //         "gray",
      //       ],
      //       hoverOffset: 4,
      //     },
      //   ],
      // };

      // let myChart = new Chart(document.getElementById("statusOverview"), {
      //   type: "doughnut",
      //   data: dataStatusChart,
      //   options: {
      //     legend: { display: false },
      //     plugins: {
      //       legend: { display: false },
      //     },
      //     aspectRatio: 1.5,
      //   },
      // });
    },
    loadInfo(currentProjectId) {
      this.items = [
        {
          type: "A-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "W-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "VA-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "TH-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "R-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "All",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "error",
          variant: "outlined",
        },
      ];
      ProjectApi.GetListScope(currentProjectId)
        .then((_res) => {
          let _now = new Date();
          let _offline_period = _res.find((o) => o.key === "offline_period")
            ? _res.find((o) => o.key === "offline_period").value
            : 0;
          let _dead_period = _res.find((o) => o.key === "lost_period")
            ? _res.find((o) => o.key === "lost_period").value
            : 0;

          this.conf.dead.raw = _dead_period;
          this.conf.offline.raw = _offline_period;
          this.fromRaw();

          DeviceMgmtApi.DeviceList(currentProjectId, "All")
            .then((res) => {
              if (res.status == 200) {
                let _infoAll = this.items.filter((o) => o.type === "All")[0];
                res.data.forEach((_ele, _ix) => {
                  let _currentStatus = 1; // 1 online, 2 offline, 3 dead, 4 maintanance
                  let _currentLastUpdate = new Date(parseInt(_ele.last_update));
                  let _offline_border = _now.setMinutes(
                    _now.getMinutes() - _offline_period
                  );
                  let _dead_border = _now.setMinutes(
                    _now.getMinutes() - _dead_period
                  );

                  // Defind Status
                  if (_ele.maintenance == "true") {
                    // Maintanance
                    _currentStatus = 4;
                  } else {
                    if (_currentLastUpdate > _offline_border) {
                      _currentStatus = 1;
                    } // Online
                    else {
                      if (_dead_border > _currentLastUpdate) {
                        _currentStatus = 3;
                      } // Dead
                      else {
                        _currentStatus = 2;
                      } // Offline
                    }
                  }

                  // Sum Up
                  let _info = null;
                  if (_ele.type == "A-Box") {
                    _info = this.items.filter((o) => o.type === "A-Box")[0];
                  } else if (_ele.type == "W-Box") {
                    _info = this.items.filter((o) => o.type === "W-Box")[0];
                  } else if (_ele.type == "VA-Box") {
                    _info = this.items.filter((o) => o.type === "VA-Box")[0];
                  } else if (_ele.type == "TH-Box") {
                    _info = this.items.filter((o) => o.type === "TH-Box")[0];
                  } else if (_ele.type == "R-Box") {
                    _info = this.items.filter((o) => o.type === "R-Box")[0];
                  }

                  if (_currentStatus == 1) {
                    _info.online += 1;
                    _infoAll.online += 1;
                  } else if (_currentStatus == 2) {
                    _info.offline += 1;
                    _infoAll.offline += 1;
                  } else if (_currentStatus == 3) {
                    _info.dead += 1;
                    _infoAll.dead += 1;
                  } else if (_currentStatus == 4) {
                    _info.maintanance += 1;
                    _infoAll.maintanance += 1;
                  }
                });

                this.selRow(_infoAll);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((_err) => {
          console.log(_err);
          let e = _err.response.data;
          if (e.status == 401) {
            console.log("In");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: e.message,
            });
            this.$router.push("/login");
          }
        });
    },
  },
  data() {
    return {
      btnDisable: true,
      tmpConf: null,
      conf: {
        offline: {
          raw: 0,
          days: 0,
          hours: 0,
          minutes: 0,
        },
        dead: {
          raw: 0,
          days: 0,
          hours: 0,
          minutes: 0,
        },
      },
      deviceTypeSel: "",
      items: [
        {
          type: "A-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "W-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "VA-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "TH-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "R-Box",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "default",
          variant: "outlined",
        },
        {
          type: "All",
          online: 0,
          offline: 0,
          dead: 0,
          new: 0,
          maintanance: 0,
          color: "error",
          variant: "outlined",
        },
      ],
    };
  },
  mounted() {
    this.createChart();
    this.loadInfo(this.projectId);
  },
};
</script>

<style>
.chart-wrapper {
  display: block;
  position: relative;
  /*width: 500px;*/
}
</style>
