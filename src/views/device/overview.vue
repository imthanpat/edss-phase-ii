<template>
  <v-container fill-height>
    <v-row class="justify-center align-center">
      <v-col cols="4">
        <v-progress-circular :size="90" indeterminate v-if="!loading"
          >Loading</v-progress-circular
        >
        <canvas id="regionChart" class="chartjs-render-monitor"></canvas>
      </v-col>
      <v-col cols="4">
        <canvas id="statusChart" class="chartjs-render-monitor"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
//import Chart from "chart.js/auto";
import ProjectApi from "../../services/ProjectApi";
import DeviceMgmtApi from "../../services/DeviceMgmtApi";

export default {
  data() {
    return {
      regionTxt: "xxx",
      loading: false,
      cntRegion: {
        bkk: 0,
        cr: 0,
        er: 0,
        nr: 0,
        ner: 0,
      },
      cntStatus: {
        bkk: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
        },
        cr: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
        },
        er: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
        },
        nr: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
        },
        ner: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
        },
      },
    };
  },
  methods: {},
  mounted() {
    ProjectApi.PhpProjectListEDSS()
      .then((response) => {
        let _projects = response.data.filter(
          (x) =>
            x.name != "REUSE" && x.name != "INVENTORY" && x.name != "UNLIST"
        );
        this.cntRegion.bkk = 0;
        this.cntRegion.cr = 0;
        this.cntRegion.er = 0;
        this.cntRegion.nr = 0;
        this.cntRegion.ner = 0;
        // Find Device
        _projects.forEach((ele, index, arr) => {
          ProjectApi.GetListScope(ele.id)
            .then((_res) => {
              //console.log(_res);
              let _now = new Date();
              let _offline_period = _res.find((o) => o.key === "offline_period")
                ? _res.find((o) => o.key === "offline_period").value
                : 0;
              let _dead_period = _res.find((o) => o.key === "lost_period")
                ? _res.find((o) => o.key === "lost_period").value
                : 0;

              DeviceMgmtApi.DeviceListEDSS(ele.id, "All")
                .then((res) => {
                  if (res.status == 200) {
                    // Cnt Region
                    this.cntRegion.bkk =
                      parseInt(this.cntRegion.bkk) +
                      parseInt(
                        res.data.filter((o) => o.region === "BKK").length
                      );
                    this.cntRegion.cr =
                      parseInt(this.cntRegion.cr) +
                      parseInt(
                        res.data.filter((o) => o.region === "CR").length
                      );
                    this.cntRegion.er =
                      parseInt(this.cntRegion.er) +
                      parseInt(
                        res.data.filter((o) => o.region === "ER").length
                      );
                    this.cntRegion.nr =
                      parseInt(this.cntRegion.nr) +
                      parseInt(
                        res.data.filter((o) => o.region === "NR").length
                      );
                    this.cntRegion.ner =
                      parseInt(this.cntRegion.ner) +
                      parseInt(
                        res.data.filter((o) => o.region === "NER").length
                      );

                    // Cnt Status
                    res.data.forEach((_ele, _ix) => {
                      let _currentStatus = 1; // 1 online, 2 offline, 3 dead, 4 maintanance
                      let _currentLastUpdate = new Date(
                        parseInt(_ele.last_update)
                      );
                      let _offline_border = _now.setMinutes(
                        _now.getMinutes() - _offline_period
                      );
                      let _dead_border = _now.setMinutes(
                        _now.getMinutes() - _dead_period
                      );

                      //console.log(_ele.maintenance);

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

                      //console.log(_currentStatus);

                      if (_ele.region == "BKK") {
                        if (_currentStatus == 1) {
                          this.cntStatus.bkk.online =
                            this.cntStatus.bkk.online + 1;
                        } else if (_currentStatus == 2) {
                          this.cntStatus.bkk.offline =
                            this.cntStatus.bkk.offline + 1;
                        } else if (_currentStatus == 3) {
                          this.cntStatus.bkk.dead = this.cntStatus.bkk.dead + 1;
                        } else if (_currentStatus == 4) {
                          this.cntStatus.bkk.maintanance =
                            this.cntStatus.bkk.maintanance + 1;
                        }
                      } else if (_ele.region == "CR") {
                        if (_currentStatus == 1) {
                          this.cntStatus.cr.online =
                            this.cntStatus.cr.online + 1;
                        } else if (_currentStatus == 2) {
                          this.cntStatus.cr.offline =
                            this.cntStatus.cr.offline + 1;
                        } else if (_currentStatus == 3) {
                          this.cntStatus.cr.dead = this.cntStatus.cr.dead + 1;
                        } else if (_currentStatus == 4) {
                          this.cntStatus.cr.maintanance =
                            this.cntStatus.cr.maintanance + 1;
                        }
                      } else if (_ele.region == "ER") {
                        if (_currentStatus == 1) {
                          this.cntStatus.er.online =
                            this.cntStatus.er.online + 1;
                        } else if (_currentStatus == 2) {
                          this.cntStatus.er.offline =
                            this.cntStatus.er.offline + 1;
                        } else if (_currentStatus == 3) {
                          this.cntStatus.er.dead = this.cntStatus.er.dead + 1;
                        } else if (_currentStatus == 4) {
                          this.cntStatus.er.maintanance =
                            this.cntStatus.er.maintanance + 1;
                        }
                      } else if (_ele.region == "NR") {
                        if (_currentStatus == 1) {
                          this.cntStatus.nr.online =
                            this.cntStatus.nr.online + 1;
                        } else if (_currentStatus == 2) {
                          this.cntStatus.nr.offline =
                            this.cntStatus.nr.offline + 1;
                        } else if (_currentStatus == 3) {
                          this.cntStatus.nr.dead = this.cntStatus.nr.dead + 1;
                        } else if (_currentStatus == 4) {
                          this.cntStatus.nr.maintanance =
                            this.cntStatus.nr.maintanance + 1;
                        }
                      } else if (_ele.region == "NER") {
                        if (_currentStatus == 1) {
                          this.cntStatus.ner.online =
                            this.cntStatus.ner.online + 1;
                        } else if (_currentStatus == 2) {
                          this.cntStatus.ner.offline =
                            this.cntStatus.ner.offline + 1;
                        } else if (_currentStatus == 3) {
                          this.cntStatus.ner.dead = this.cntStatus.ner.dead + 1;
                        } else if (_currentStatus == 4) {
                          this.cntStatus.ner.maintanance =
                            this.cntStatus.ner.maintanance + 1;
                        }
                      }
                    });
                  }

                  // Last Times
                  if (index === _projects.length - 1) {
                    //console.log("Can Your See?");
                    //console.log(this.cntStatus);
                    //console.log(this.cntRegion);

                    // Complete
                    const dataregionChart = {
                      labels: ["BKK", "CR", "ER", "NR", "NER"],
                      cntStatus: this.cntStatus,
                      datasets: [
                        {
                          label: "My First Dataset",
                          data: [
                            this.cntRegion.bkk,
                            this.cntRegion.cr,
                            this.cntRegion.er,
                            this.cntRegion.nr,
                            this.cntRegion.ner,
                          ],
                          backgroundColor: [
                            "rgba(255, 99, 132)",
                            "rgba(255, 159, 64)",
                            "rgba(255, 205, 86)",
                            "rgba(75, 192, 192)",
                            "rgba(54, 162, 235)",
                          ],
                          hoverOffset: 4,
                        },
                      ],
                    };

                    // let chartStatus = Chart.getChart("regionChart"); // <canvas> id
                    // if (chartStatus != undefined) {
                    //   chartStatus.destroy();
                    // }
                    const myChart = new Chart(
                      document.getElementById("regionChart"),
                      {
                        type: "outlabeledDoughnut",
                        data: dataregionChart,
                        options: {
                          layout: {
                            padding: 50,
                          },
                          title: {
                            display: true,
                          },
                          aspectRatio: 1,
                          responsive: true,
                          plugins: {
                            //legend: false,
                            title: {
                              display: true,
                              text: "Total",
                            },
                            outlabels: {
                              text: "%l\n%v (%p)",
                              color: "white",
                              stretch: 40,
                              font: {
                                resizable: true,
                                minSize: 12,
                                maxSize: 18,
                              },
                            },
                          },
                          onClick: function (event, chartElements) {
                            if (chartElements) {
                              let _dataStatus = [];
                              console.log(chartElements[0]);
                              let _region =
                                dataregionChart.labels[chartElements[0]._index];
                              if (_region == "BKK") {
                                //console.log("in");
                                _dataStatus = [
                                  dataregionChart.cntStatus.bkk.dead,
                                  dataregionChart.cntStatus.bkk.offline,
                                  dataregionChart.cntStatus.bkk.online,
                                  dataregionChart.cntStatus.bkk.maintanance,
                                ];
                              } else if (_region == "CR") {
                                _dataStatus = [
                                  dataregionChart.cntStatus.cr.dead,
                                  dataregionChart.cntStatus.cr.offline,
                                  dataregionChart.cntStatus.cr.online,
                                  dataregionChart.cntStatus.cr.maintanance,
                                ];
                              } else if (_region == "ER") {
                                _dataStatus = [
                                  dataregionChart.cntStatus.er.dead,
                                  dataregionChart.cntStatus.er.offline,
                                  dataregionChart.cntStatus.er.online,
                                  dataregionChart.cntStatus.er.maintanance,
                                ];
                              } else if (_region == "NR") {
                                _dataStatus = [
                                  dataregionChart.cntStatus.nr.dead,
                                  dataregionChart.cntStatus.nr.offline,
                                  dataregionChart.cntStatus.nr.online,
                                  dataregionChart.cntStatus.nr.maintanance,
                                ];
                              } else if (_region == "NER") {
                                _dataStatus = [
                                  dataregionChart.cntStatus.ner.dead,
                                  dataregionChart.cntStatus.ner.offline,
                                  dataregionChart.cntStatus.ner.online,
                                  dataregionChart.cntStatus.ner.maintanance,
                                ];
                              }

                              const dataStatusChart = {
                                labels: [
                                  "Dead",
                                  "Offline",
                                  "Online",
                                  "Maintanance",
                                ],
                                datasets: [
                                  {
                                    label: "My First Dataset",
                                    data: _dataStatus,
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

                              // let chartStatus = Chart.getChart("statusChart"); // <canvas> id
                              // if (chartStatus != undefined) {
                              //   chartStatus.destroy();
                              // }

                              const myChart = new Chart(
                                document.getElementById("statusChart"),
                                {
                                  type: "outlabeledDoughnut",
                                  data: dataStatusChart,
                                  options: {
                                    layout: {
                                      padding: 50,
                                    },
                                    aspectRatio: 1.5,
                                    responsive: true,
                                    plugins: {
                                      legend: {
                                        display: false,
                                      },
                                      title: {
                                        display: true,
                                        text: _region,
                                      },
                                      outlabels: {
                                        text: "%l\n%v (%p)",
                                        color: "white",
                                        stretch: 40,
                                        font: {
                                          resizable: true,
                                          minSize: 12,
                                          maxSize: 18,
                                        },
                                      },
                                    },
                                  },
                                }
                              );
                            }
                          },
                        },
                      }
                    );
                    this.loading = true;
                  }
                })
                .catch((errr) => {
                  console.log(errr);
                });
            })
            .catch((_err) => {
              console.log(_err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
