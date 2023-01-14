<template>
  <v-container fluid fill-height>
    <v-card width="inherit" class="mx-auto">
      <v-toolbar
        color="grey darken-4"
        style="background-color: rgb(72, 73, 71) !important"
      >
        <v-toolbar-title
          ><h6 class="text-h6" style="color: white">
            Device Summary
          </h6></v-toolbar-title
        >
      </v-toolbar>

      <v-card-text
        style="
          width: -webkit-fill-available;
          height: -webkit-fill-available;
          padding: 0px;
        "
      >
        <v-row class="justify-center align-center">
          <v-col cols="4">
            <div class="mt-5 ml-5 mr-5">
              <h2 class="text-h6 mb-2">Choose Device Type</h2>
              <v-chip-group v-model="selType" column multiple>
                <v-chip filter variant="outlined"> A-Box </v-chip>
                <v-chip filter variant="outlined"> W-Box </v-chip>
                <v-chip filter variant="outlined"> VA-Box </v-chip>
                <v-chip filter variant="outlined"> TH-Box </v-chip>
                <v-chip filter variant="outlined"> R-Box </v-chip>
              </v-chip-group>
            </div>
            <p class="text-right text-md-left ml-5 mt-5">
              <strong>click in chart area to view details</strong>
            </p>
            <div id="chart-wrapper">
              <canvas id="regionChart" class="chartjs-render-monitor"></canvas>
            </div>
          </v-col>

          <v-divider class="mb-2 mt-2" vertical></v-divider>

          <v-col cols="4">
            <div id="chart-wrapper-1">
              <canvas id="statusChart1" class="chartjs-render-monitor"></canvas>
            </div>
            <!-- <v-timeline side="end" align="start">
          <v-timeline-item dot-color="#009688" size="small">
            <div class="d-flex">
              <strong class="mr-4">&nbsp;</strong>
              <div>
                <strong>{{cntStatus.bkk.online}}</strong>
                <div class="text-caption">Online</div>
              </div>
            </div>
          </v-timeline-item>

          <v-timeline-item dot-color="rgb(255, 159, 64)" size="small">
            <div class="d-flex">
              <strong class="mr-4">&nbsp;</strong>
              <div>
                <strong>{{cntStatus.bkk.offline}}</strong>
                <div class="text-caption">Offline</div>
              </div>
            </div>
          </v-timeline-item>

          <v-timeline-item dot-color="rgb(255, 99, 132)" size="small">
            <div class="d-flex">
              <strong class="mr-4">&nbsp;</strong>
              <div>
                <strong>{{cntStatus.bkk.dead}}</strong>
                <div class="text-caption">Dead</div>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline> -->
          </v-col>
          <v-col cols="4">
            <div id="chart-wrapper-2">
              <canvas id="statusChart2" class="chartjs-render-monitor"></canvas>
            </div>
          </v-col>

          <v-col cols="12">
            <v-alert class="text-right" border>
              Region :
              <v-chip size="large" class="text-center" variant="outlined" label
                ><strong>{{ txtRegionShow }}</strong></v-chip
              >
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
//import {Chart} from "chart.js";
import ProjectApi from "../../services/ProjectApi";
import DeviceMgmtApi from "../../services/DeviceMgmtApi";
import "chart.js";
import "chartjs-plugin-doughnutlabel";
import "chartjs-plugin-piechart-outlabels";

var myChart = null;
var _myChart = null;
var _myChart1 = null;
var regionTxt = null;
export default {
  data() {
    return {
      txtRegionShow: "",
      loading: false,
      cntSubStaus: {
        bkk: {
          abox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          wbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          vabox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          thbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          rbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
        },
        cr: {
          abox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          wbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          vabox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          thbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          rbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
        },
        er: {
          abox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          wbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          vabox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          thbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          rbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
        },
        nr: {
          abox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          wbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          vabox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          thbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          rbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
        },
        ner: {
          abox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          wbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          vabox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          thbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          rbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
        },
        sr: {
          abox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          wbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          vabox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          thbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
          rbox: {
            online: 0,
            offline: 0,
            dead: 0,
            maintanance: 0,
            unlist: 0,
            new: 0,
            ready: 0,
            reuse: 0,
          },
        },
      },
      cntSubRegion: {
        bkk: {
          abox: 0,
          wbox: 0,
          vabox: 0,
          thbox: 0,
          rbox: 0,
        },
        cr: {
          abox: 0,
          wbox: 0,
          vabox: 0,
          thbox: 0,
          rbox: 0,
        },
        er: {
          abox: 0,
          wbox: 0,
          vabox: 0,
          thbox: 0,
          rbox: 0,
        },
        nr: {
          abox: 0,
          wbox: 0,
          vabox: 0,
          thbox: 0,
          rbox: 0,
        },
        ner: {
          abox: 0,
          wbox: 0,
          vabox: 0,
          thbox: 0,
          rbox: 0,
        },
        sr: {
          abox: 0,
          wbox: 0,
          vabox: 0,
          thbox: 0,
          rbox: 0,
        },
      },
      cntRegion: {
        bkk: 0,
        cr: 0,
        er: 0,
        nr: 0,
        ner: 0,
        sr: 0,
      },
      cntStatus: {
        bkk: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
          unlist: 0,
          new: 0,
          ready: 0,
          reuse: 0,
        },
        cr: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
          unlist: 0,
          new: 0,
          ready: 0,
          reuse: 0,
        },
        er: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
          unlist: 0,
          new: 0,
          ready: 0,
          reuse: 0,
        },
        nr: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
          unlist: 0,
          new: 0,
          ready: 0,
          reuse: 0,
        },
        ner: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
          unlist: 0,
          new: 0,
          ready: 0,
          reuse: 0,
        },
        sr: {
          online: 0,
          offline: 0,
          dead: 0,
          maintanance: 0,
          unlist: 0,
          new: 0,
          ready: 0,
          reuse: 0,
        },
      },
      selType: [0, 1, 2, 3, 4],
    };
  },
  methods: {
    createChart(dataregionChart) {
      let _dataStatus = [];
      let _dataStatus1 = [];
      let _region = regionTxt;
      if (_region == "BKK") {
        //console.log("in");
        _dataStatus = [
          dataregionChart.cntStatus.bkk.dead == 0
            ? "N/A"
            : dataregionChart.cntStatus.bkk.dead,
          dataregionChart.cntStatus.bkk.offline == 0
            ? "N/A"
            : dataregionChart.cntStatus.bkk.offline,
          dataregionChart.cntStatus.bkk.online == 0
            ? "N/A"
            : dataregionChart.cntStatus.bkk.online,
        ];

        _dataStatus1 = [
          dataregionChart.cntStatus.bkk.maintanance == 0
            ? "N/A"
            : dataregionChart.cntStatus.bkk.maintanance,
          dataregionChart.cntStatus.bkk.unlist == 0
            ? "N/A"
            : dataregionChart.cntStatus.bkk.unlist,
          dataregionChart.cntStatus.bkk.new == 0
            ? "N/A"
            : dataregionChart.cntStatus.bkk.new,
          dataregionChart.cntStatus.bkk.ready == 0
            ? "N/A"
            : dataregionChart.cntStatus.bkk.ready,
          dataregionChart.cntStatus.bkk.reuse == 0
            ? "N/A"
            : dataregionChart.cntStatus.bkk.reuse,
        ];
      } else if (_region == "CR") {
        _dataStatus = [
          dataregionChart.cntStatus.cr.dead == 0
            ? "N/A"
            : dataregionChart.cntStatus.cr.dead,
          dataregionChart.cntStatus.cr.offline == 0
            ? "N/A"
            : dataregionChart.cntStatus.cr.offline,
          dataregionChart.cntStatus.cr.online == 0
            ? "N/A"
            : dataregionChart.cntStatus.cr.online,
        ];

        _dataStatus1 = [
          dataregionChart.cntStatus.cr.maintanance == 0
            ? "N/A"
            : dataregionChart.cntStatus.cr.maintanance,
          dataregionChart.cntStatus.cr.unlist == 0
            ? "N/A"
            : dataregionChart.cntStatus.cr.unlist,
          dataregionChart.cntStatus.cr.new == 0
            ? "N/A"
            : dataregionChart.cntStatus.cr.new,
          dataregionChart.cntStatus.cr.ready == 0
            ? "N/A"
            : dataregionChart.cntStatus.cr.ready,
          dataregionChart.cntStatus.cr.reuse == 0
            ? "N/A"
            : dataregionChart.cntStatus.cr.reuse,
        ];
      } else if (_region == "ER") {
        _dataStatus = [
          dataregionChart.cntStatus.er.dead == 0
            ? "N/A"
            : dataregionChart.cntStatus.er.dead,
          dataregionChart.cntStatus.er.offline == 0
            ? "N/A"
            : dataregionChart.cntStatus.er.offline,
          dataregionChart.cntStatus.er.online == 0
            ? "N/A"
            : dataregionChart.cntStatus.er.online,
        ];

        _dataStatus1 = [
          dataregionChart.cntStatus.er.maintanance == 0
            ? "N/A"
            : dataregionChart.cntStatus.er.maintanance,
          dataregionChart.cntStatus.er.unlist == 0
            ? "N/A"
            : dataregionChart.cntStatus.er.unlist,
          dataregionChart.cntStatus.er.new == 0
            ? "N/A"
            : dataregionChart.cntStatus.er.new,
          dataregionChart.cntStatus.er.ready == 0
            ? "N/A"
            : dataregionChart.cntStatus.er.ready,
          dataregionChart.cntStatus.er.reuse == 0
            ? "N/A"
            : dataregionChart.cntStatus.er.reuse,
        ];
      } else if (_region == "NR") {
        _dataStatus = [
          dataregionChart.cntStatus.nr.dead == 0
            ? "N/A"
            : dataregionChart.cntStatus.nr.dead,
          dataregionChart.cntStatus.nr.offline == 0
            ? "N/A"
            : dataregionChart.cntStatus.nr.offline,
          dataregionChart.cntStatus.nr.online == 0
            ? "N/A"
            : dataregionChart.cntStatus.nr.online,
        ];

        _dataStatus1 = [
          dataregionChart.cntStatus.nr.maintanance == 0
            ? "N/A"
            : dataregionChart.cntStatus.nr.maintanance,
          dataregionChart.cntStatus.nr.unlist == 0
            ? "N/A"
            : dataregionChart.cntStatus.nr.unlist,
          dataregionChart.cntStatus.nr.new == 0
            ? "N/A"
            : dataregionChart.cntStatus.nr.new,
          dataregionChart.cntStatus.nr.ready == 0
            ? "N/A"
            : dataregionChart.cntStatus.nr.ready,
          dataregionChart.cntStatus.nr.reuse == 0
            ? "N/A"
            : dataregionChart.cntStatus.nr.reuse,
        ];
      } else if (_region == "NER") {
        _dataStatus = [
          dataregionChart.cntStatus.ner.dead == 0
            ? "N/A"
            : dataregionChart.cntStatus.ner.dead,
          dataregionChart.cntStatus.ner.offline == 0
            ? "N/A"
            : dataregionChart.cntStatus.ner.offline,
          dataregionChart.cntStatus.ner.online == 0
            ? "N/A"
            : dataregionChart.cntStatus.ner.online,
        ];

        _dataStatus1 = [
          dataregionChart.cntStatus.ner.maintanance == 0
            ? "N/A"
            : dataregionChart.cntStatus.ner.maintanance,
          dataregionChart.cntStatus.ner.unlist == 0
            ? "N/A"
            : dataregionChart.cntStatus.ner.unlist,
          dataregionChart.cntStatus.ner.new == 0
            ? "N/A"
            : dataregionChart.cntStatus.ner.new,
          dataregionChart.cntStatus.ner.ready == 0
            ? "N/A"
            : dataregionChart.cntStatus.ner.ready,
          dataregionChart.cntStatus.ner.reuse == 0
            ? "N/A"
            : dataregionChart.cntStatus.ner.reuse,
        ];
      }

      let dataStatusChart = {
        labels: ["Dead", "Offline", "Online"],
        datasets: [
          {
            label: "My First Dataset",
            data: _dataStatus,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "#009688",
            ],
            hoverOffset: 4,
          },
        ],
      };

      let dataStatusChart1 = {
        labels: ["Maintanance", "Unlist", "New", "Ready", "Reuse"],
        datasets: [
          {
            label: "My First Dataset",
            data: _dataStatus1,
            backgroundColor: [
              "gray",
              "#3B3B38",
              "#36a2eb",
              "#4bc0c0",
              "#9089cd",
            ],
            hoverOffset: 4,
          },
        ],
      };

      let _ctxx = document.getElementById("statusChart1");
      let chartStatusxx = new Chart(_ctxx);
      if (chartStatusxx != undefined) {
        chartStatusxx.destroy();
      }

      _myChart = new Chart(document.getElementById("statusChart1"), {
        type: "outlabeledDoughnut",
        data: dataStatusChart,
        options: {
          title: {
            display: true,
            text: "Status",
            fontSize: 22,
          },
          // layout: {
          //   padding: 100,
          // },
          aspectRatio: 1,
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
            doughnutlabel: {
              labels: [
                {
                  text: _region,
                  font: {
                    size: 18,
                  },
                  color: "#3B3B38",
                },
              ],
            },
          },
        },
      });

      let _ctxxx = document.getElementById("statusChart2");
      let chartStatusxxx = new Chart(_ctxxx);
      if (chartStatusxxx != undefined) {
        chartStatusxxx.destroy();
      }

      _myChart1 = new Chart(document.getElementById("statusChart2"), {
        type: "outlabeledDoughnut",
        data: dataStatusChart1,
        options: {
          // layout: {
          //   padding: 100,
          // },
          title: {
            display: true,
            text: "Stock",
            fontSize: 22,
          },
          aspectRatio: 1,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Stock",
              font: {
                size: 32,
              },
            },
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
              stretch: 30,
              font: {
                resizable: true,
                minSize: 12,
                maxSize: 18,
              },
            },
            doughnutlabel: {
              labels: [
                {
                  text: _region,
                  font: {
                    size: 18,
                  },
                  color: "#3B3B38",
                },
              ],
            },
          },
        },
      });

      document.getElementById("statusChart1").style.display = "none";
      document.getElementById("statusChart2").style.display = "none";

    },
    updateChart() {
      let _newData = [0, 0, 0, 0, 0, 0]; // ["BKK", "CR", "ER", "NR", "NER", "SR"]
      let _newStatus1 = [0, 0, 0]; // ["Dead", "Offline", "Online"]
      let _newStatus2 = [0, 0, 0, 0, 0]; //["Maintanance","Unlist","New","Ready To Implement","Reuse",]
      this.txtRegionShow = regionTxt;

      if (this.selType.includes(0)) {
        _newData[0] += this.cntSubRegion.bkk.abox;
        _newData[1] += this.cntSubRegion.cr.abox;
        _newData[2] += this.cntSubRegion.er.abox;
        _newData[3] += this.cntSubRegion.nr.abox;
        _newData[4] += this.cntSubRegion.ner.abox;
        _newData[5] += this.cntSubRegion.sr.abox;

        if (regionTxt == "BKK") {
          _newStatus1[0] += this.cntSubStaus.bkk.abox.dead;
          _newStatus1[1] += this.cntSubStaus.bkk.abox.offline;
          _newStatus1[2] += this.cntSubStaus.bkk.abox.online;

          _newStatus2[0] += this.cntSubStaus.bkk.abox.maintanance;
          _newStatus2[1] += this.cntSubStaus.bkk.abox.unlist;
          _newStatus2[2] += this.cntSubStaus.bkk.abox.new;
          _newStatus2[3] += this.cntSubStaus.bkk.abox.ready;
          _newStatus2[4] += this.cntSubStaus.bkk.abox.reuse;
        }

        if (regionTxt == "CR") {
          _newStatus1[0] += this.cntSubStaus.cr.abox.dead;
          _newStatus1[1] += this.cntSubStaus.cr.abox.offline;
          _newStatus1[2] += this.cntSubStaus.cr.abox.online;

          _newStatus2[0] += this.cntSubStaus.cr.abox.maintanance;
          _newStatus2[1] += this.cntSubStaus.cr.abox.unlist;
          _newStatus2[2] += this.cntSubStaus.cr.abox.new;
          _newStatus2[3] += this.cntSubStaus.cr.abox.ready;
          _newStatus2[4] += this.cntSubStaus.cr.abox.reuse;
        }

        if (regionTxt == "ER") {
          _newStatus1[0] += this.cntSubStaus.er.abox.dead;
          _newStatus1[1] += this.cntSubStaus.er.abox.offline;
          _newStatus1[2] += this.cntSubStaus.er.abox.online;

          _newStatus2[0] += this.cntSubStaus.er.abox.maintanance;
          _newStatus2[1] += this.cntSubStaus.er.abox.unlist;
          _newStatus2[2] += this.cntSubStaus.er.abox.new;
          _newStatus2[3] += this.cntSubStaus.er.abox.ready;
          _newStatus2[4] += this.cntSubStaus.er.abox.reuse;
        }

        if (regionTxt == "NR") {
          _newStatus1[0] += this.cntSubStaus.nr.abox.dead;
          _newStatus1[1] += this.cntSubStaus.nr.abox.offline;
          _newStatus1[2] += this.cntSubStaus.nr.abox.online;

          _newStatus2[0] += this.cntSubStaus.nr.abox.maintanance;
          _newStatus2[1] += this.cntSubStaus.nr.abox.unlist;
          _newStatus2[2] += this.cntSubStaus.nr.abox.new;
          _newStatus2[3] += this.cntSubStaus.nr.abox.ready;
          _newStatus2[4] += this.cntSubStaus.nr.abox.reuse;
        }

        if (regionTxt == "NER") {
          _newStatus1[0] += this.cntSubStaus.ner.abox.dead;
          _newStatus1[1] += this.cntSubStaus.ner.abox.offline;
          _newStatus1[2] += this.cntSubStaus.ner.abox.online;

          _newStatus2[0] += this.cntSubStaus.ner.abox.maintanance;
          _newStatus2[1] += this.cntSubStaus.ner.abox.unlist;
          _newStatus2[2] += this.cntSubStaus.ner.abox.new;
          _newStatus2[3] += this.cntSubStaus.ner.abox.ready;
          _newStatus2[4] += this.cntSubStaus.ner.abox.reuse;
        }

        if (regionTxt == "SR") {
          _newStatus1[0] += this.cntSubStaus.sr.abox.dead;
          _newStatus1[1] += this.cntSubStaus.sr.abox.offline;
          _newStatus1[2] += this.cntSubStaus.sr.abox.online;

          _newStatus2[0] += this.cntSubStaus.sr.abox.maintanance;
          _newStatus2[1] += this.cntSubStaus.sr.abox.unlist;
          _newStatus2[2] += this.cntSubStaus.sr.abox.new;
          _newStatus2[3] += this.cntSubStaus.sr.abox.ready;
          _newStatus2[4] += this.cntSubStaus.sr.abox.reuse;
        }
      }
      if (this.selType.includes(1)) {
        _newData[0] += this.cntSubRegion.bkk.wbox;
        _newData[1] += this.cntSubRegion.cr.wbox;
        _newData[2] += this.cntSubRegion.er.wbox;
        _newData[3] += this.cntSubRegion.nr.wbox;
        _newData[4] += this.cntSubRegion.ner.wbox;
        _newData[5] += this.cntSubRegion.sr.wbox;

        if (regionTxt == "BKK") {
          _newStatus1[0] += this.cntSubStaus.bkk.wbox.dead;
          _newStatus1[1] += this.cntSubStaus.bkk.wbox.offline;
          _newStatus1[2] += this.cntSubStaus.bkk.wbox.online;

          _newStatus2[0] += this.cntSubStaus.bkk.wbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.bkk.wbox.unlist;
          _newStatus2[2] += this.cntSubStaus.bkk.wbox.new;
          _newStatus2[3] += this.cntSubStaus.bkk.wbox.ready;
          _newStatus2[4] += this.cntSubStaus.bkk.wbox.reuse;
        }

        if (regionTxt == "CR") {
          _newStatus1[0] += this.cntSubStaus.cr.wbox.dead;
          _newStatus1[1] += this.cntSubStaus.cr.wbox.offline;
          _newStatus1[2] += this.cntSubStaus.cr.wbox.online;

          _newStatus2[0] += this.cntSubStaus.cr.wbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.cr.wbox.unlist;
          _newStatus2[2] += this.cntSubStaus.cr.wbox.new;
          _newStatus2[3] += this.cntSubStaus.cr.wbox.ready;
          _newStatus2[4] += this.cntSubStaus.cr.wbox.reuse;
        }

        if (regionTxt == "ER") {
          _newStatus1[0] += this.cntSubStaus.er.wbox.dead;
          _newStatus1[1] += this.cntSubStaus.er.wbox.offline;
          _newStatus1[2] += this.cntSubStaus.er.wbox.online;

          _newStatus2[0] += this.cntSubStaus.er.wbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.er.wbox.unlist;
          _newStatus2[2] += this.cntSubStaus.er.wbox.new;
          _newStatus2[3] += this.cntSubStaus.er.wbox.ready;
          _newStatus2[4] += this.cntSubStaus.er.wbox.reuse;
        }

        if (regionTxt == "NR") {
          _newStatus1[0] += this.cntSubStaus.nr.wbox.dead;
          _newStatus1[1] += this.cntSubStaus.nr.wbox.offline;
          _newStatus1[2] += this.cntSubStaus.nr.wbox.online;

          _newStatus2[0] += this.cntSubStaus.nr.wbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.nr.wbox.unlist;
          _newStatus2[2] += this.cntSubStaus.nr.wbox.new;
          _newStatus2[3] += this.cntSubStaus.nr.wbox.ready;
          _newStatus2[4] += this.cntSubStaus.nr.wbox.reuse;
        }

        if (regionTxt == "NER") {
          _newStatus1[0] += this.cntSubStaus.ner.wbox.dead;
          _newStatus1[1] += this.cntSubStaus.ner.wbox.offline;
          _newStatus1[2] += this.cntSubStaus.ner.wbox.online;

          _newStatus2[0] += this.cntSubStaus.ner.wbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.ner.wbox.unlist;
          _newStatus2[2] += this.cntSubStaus.ner.wbox.new;
          _newStatus2[3] += this.cntSubStaus.ner.wbox.ready;
          _newStatus2[4] += this.cntSubStaus.ner.wbox.reuse;
        }

        if (regionTxt == "SR") {
          _newStatus1[0] += this.cntSubStaus.sr.wbox.dead;
          _newStatus1[1] += this.cntSubStaus.sr.wbox.offline;
          _newStatus1[2] += this.cntSubStaus.sr.wbox.online;

          _newStatus2[0] += this.cntSubStaus.sr.wbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.sr.wbox.unlist;
          _newStatus2[2] += this.cntSubStaus.sr.wbox.new;
          _newStatus2[3] += this.cntSubStaus.sr.wbox.ready;
          _newStatus2[4] += this.cntSubStaus.sr.wbox.reuse;
        }
      }
      if (this.selType.includes(2)) {
        _newData[0] += this.cntSubRegion.bkk.vabox;
        _newData[1] += this.cntSubRegion.cr.vabox;
        _newData[2] += this.cntSubRegion.er.vabox;
        _newData[3] += this.cntSubRegion.nr.vabox;
        _newData[4] += this.cntSubRegion.ner.vabox;
        _newData[5] += this.cntSubRegion.sr.vabox;

        if (regionTxt == "BKK") {
          _newStatus1[0] += this.cntSubStaus.bkk.vabox.dead;
          _newStatus1[1] += this.cntSubStaus.bkk.vabox.offline;
          _newStatus1[2] += this.cntSubStaus.bkk.vabox.online;

          _newStatus2[0] += this.cntSubStaus.bkk.vabox.maintanance;
          _newStatus2[1] += this.cntSubStaus.bkk.vabox.unlist;
          _newStatus2[2] += this.cntSubStaus.bkk.vabox.new;
          _newStatus2[3] += this.cntSubStaus.bkk.vabox.ready;
          _newStatus2[4] += this.cntSubStaus.bkk.vabox.reuse;
        }

        if (regionTxt == "CR") {
          _newStatus1[0] += this.cntSubStaus.cr.vabox.dead;
          _newStatus1[1] += this.cntSubStaus.cr.vabox.offline;
          _newStatus1[2] += this.cntSubStaus.cr.vabox.online;

          _newStatus2[0] += this.cntSubStaus.cr.vabox.maintanance;
          _newStatus2[1] += this.cntSubStaus.cr.vabox.unlist;
          _newStatus2[2] += this.cntSubStaus.cr.vabox.new;
          _newStatus2[3] += this.cntSubStaus.cr.vabox.ready;
          _newStatus2[4] += this.cntSubStaus.cr.vabox.reuse;
        }

        if (regionTxt == "ER") {
          _newStatus1[0] += this.cntSubStaus.er.vabox.dead;
          _newStatus1[1] += this.cntSubStaus.er.vabox.offline;
          _newStatus1[2] += this.cntSubStaus.er.vabox.online;

          _newStatus2[0] += this.cntSubStaus.er.vabox.maintanance;
          _newStatus2[1] += this.cntSubStaus.er.vabox.unlist;
          _newStatus2[2] += this.cntSubStaus.er.vabox.new;
          _newStatus2[3] += this.cntSubStaus.er.vabox.ready;
          _newStatus2[4] += this.cntSubStaus.er.vabox.reuse;
        }

        if (regionTxt == "NR") {
          _newStatus1[0] += this.cntSubStaus.nr.vabox.dead;
          _newStatus1[1] += this.cntSubStaus.nr.vabox.offline;
          _newStatus1[2] += this.cntSubStaus.nr.vabox.online;

          _newStatus2[0] += this.cntSubStaus.nr.vabox.maintanance;
          _newStatus2[1] += this.cntSubStaus.nr.vabox.unlist;
          _newStatus2[2] += this.cntSubStaus.nr.vabox.new;
          _newStatus2[3] += this.cntSubStaus.nr.vabox.ready;
          _newStatus2[4] += this.cntSubStaus.nr.vabox.reuse;
        }

        if (regionTxt == "NER") {
          _newStatus1[0] += this.cntSubStaus.ner.vabox.dead;
          _newStatus1[1] += this.cntSubStaus.ner.vabox.offline;
          _newStatus1[2] += this.cntSubStaus.ner.vabox.online;

          _newStatus2[0] += this.cntSubStaus.ner.vabox.maintanance;
          _newStatus2[1] += this.cntSubStaus.ner.vabox.unlist;
          _newStatus2[2] += this.cntSubStaus.ner.vabox.new;
          _newStatus2[3] += this.cntSubStaus.ner.vabox.ready;
          _newStatus2[4] += this.cntSubStaus.ner.vabox.reuse;
        }

        if (regionTxt == "SR") {
          _newStatus1[0] += this.cntSubStaus.sr.vabox.dead;
          _newStatus1[1] += this.cntSubStaus.sr.vabox.offline;
          _newStatus1[2] += this.cntSubStaus.sr.vabox.online;

          _newStatus2[0] += this.cntSubStaus.sr.vabox.maintanance;
          _newStatus2[1] += this.cntSubStaus.sr.vabox.unlist;
          _newStatus2[2] += this.cntSubStaus.sr.vabox.new;
          _newStatus2[3] += this.cntSubStaus.sr.vabox.ready;
          _newStatus2[4] += this.cntSubStaus.sr.vabox.reuse;
        }
      }
      if (this.selType.includes(3)) {
        _newData[0] += this.cntSubRegion.bkk.thbox;
        _newData[1] += this.cntSubRegion.cr.thbox;
        _newData[2] += this.cntSubRegion.er.thbox;
        _newData[3] += this.cntSubRegion.nr.thbox;
        _newData[4] += this.cntSubRegion.ner.thbox;
        _newData[5] += this.cntSubRegion.sr.thbox;

        if (regionTxt == "BKK") {
          _newStatus1[0] += this.cntSubStaus.bkk.thbox.dead;
          _newStatus1[1] += this.cntSubStaus.bkk.thbox.offline;
          _newStatus1[2] += this.cntSubStaus.bkk.thbox.online;

          _newStatus2[0] += this.cntSubStaus.bkk.thbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.bkk.thbox.unlist;
          _newStatus2[2] += this.cntSubStaus.bkk.thbox.new;
          _newStatus2[3] += this.cntSubStaus.bkk.thbox.ready;
          _newStatus2[4] += this.cntSubStaus.bkk.thbox.reuse;
        }

        if (regionTxt == "CR") {
          _newStatus1[0] += this.cntSubStaus.cr.thbox.dead;
          _newStatus1[1] += this.cntSubStaus.cr.thbox.offline;
          _newStatus1[2] += this.cntSubStaus.cr.thbox.online;

          _newStatus2[0] += this.cntSubStaus.cr.thbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.cr.thbox.unlist;
          _newStatus2[2] += this.cntSubStaus.cr.thbox.new;
          _newStatus2[3] += this.cntSubStaus.cr.thbox.ready;
          _newStatus2[4] += this.cntSubStaus.cr.thbox.reuse;
        }

        if (regionTxt == "ER") {
          _newStatus1[0] += this.cntSubStaus.er.thbox.dead;
          _newStatus1[1] += this.cntSubStaus.er.thbox.offline;
          _newStatus1[2] += this.cntSubStaus.er.thbox.online;

          _newStatus2[0] += this.cntSubStaus.er.thbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.er.thbox.unlist;
          _newStatus2[2] += this.cntSubStaus.er.thbox.new;
          _newStatus2[3] += this.cntSubStaus.er.thbox.ready;
          _newStatus2[4] += this.cntSubStaus.er.thbox.reuse;
        }

        if (regionTxt == "NR") {
          _newStatus1[0] += this.cntSubStaus.nr.thbox.dead;
          _newStatus1[1] += this.cntSubStaus.nr.thbox.offline;
          _newStatus1[2] += this.cntSubStaus.nr.thbox.online;

          _newStatus2[0] += this.cntSubStaus.nr.thbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.nr.thbox.unlist;
          _newStatus2[2] += this.cntSubStaus.nr.thbox.new;
          _newStatus2[3] += this.cntSubStaus.nr.thbox.ready;
          _newStatus2[4] += this.cntSubStaus.nr.thbox.reuse;
        }

        if (regionTxt == "NER") {
          _newStatus1[0] += this.cntSubStaus.ner.thbox.dead;
          _newStatus1[1] += this.cntSubStaus.ner.thbox.offline;
          _newStatus1[2] += this.cntSubStaus.ner.thbox.online;

          _newStatus2[0] += this.cntSubStaus.ner.thbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.ner.thbox.unlist;
          _newStatus2[2] += this.cntSubStaus.ner.thbox.new;
          _newStatus2[3] += this.cntSubStaus.ner.thbox.ready;
          _newStatus2[4] += this.cntSubStaus.ner.thbox.reuse;
        }

        if (regionTxt == "SR") {
          _newStatus1[0] += this.cntSubStaus.sr.thbox.dead;
          _newStatus1[1] += this.cntSubStaus.sr.thbox.offline;
          _newStatus1[2] += this.cntSubStaus.sr.thbox.online;

          _newStatus2[0] += this.cntSubStaus.sr.thbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.sr.thbox.unlist;
          _newStatus2[2] += this.cntSubStaus.sr.thbox.new;
          _newStatus2[3] += this.cntSubStaus.sr.thbox.ready;
          _newStatus2[4] += this.cntSubStaus.sr.thbox.reuse;
        }
      }
      if (this.selType.includes(4)) {
        _newData[0] += this.cntSubRegion.bkk.rbox;
        _newData[1] += this.cntSubRegion.cr.rbox;
        _newData[2] += this.cntSubRegion.er.rbox;
        _newData[3] += this.cntSubRegion.nr.rbox;
        _newData[4] += this.cntSubRegion.ner.rbox;
        _newData[5] += this.cntSubRegion.sr.rbox;

        if (regionTxt == "BKK") {
          _newStatus1[0] += this.cntSubStaus.bkk.rbox.dead;
          _newStatus1[1] += this.cntSubStaus.bkk.rbox.offline;
          _newStatus1[2] += this.cntSubStaus.bkk.rbox.online;

          _newStatus2[0] += this.cntSubStaus.bkk.rbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.bkk.rbox.unlist;
          _newStatus2[2] += this.cntSubStaus.bkk.rbox.new;
          _newStatus2[3] += this.cntSubStaus.bkk.rbox.ready;
          _newStatus2[4] += this.cntSubStaus.bkk.rbox.reuse;
        }

        if (regionTxt == "CR") {
          _newStatus1[0] += this.cntSubStaus.cr.rbox.dead;
          _newStatus1[1] += this.cntSubStaus.cr.rbox.offline;
          _newStatus1[2] += this.cntSubStaus.cr.rbox.online;

          _newStatus2[0] += this.cntSubStaus.cr.rbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.cr.rbox.unlist;
          _newStatus2[2] += this.cntSubStaus.cr.rbox.new;
          _newStatus2[3] += this.cntSubStaus.cr.rbox.ready;
          _newStatus2[4] += this.cntSubStaus.cr.rbox.reuse;
        }

        if (regionTxt == "ER") {
          _newStatus1[0] += this.cntSubStaus.er.rbox.dead;
          _newStatus1[1] += this.cntSubStaus.er.rbox.offline;
          _newStatus1[2] += this.cntSubStaus.er.rbox.online;

          _newStatus2[0] += this.cntSubStaus.er.rbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.er.rbox.unlist;
          _newStatus2[2] += this.cntSubStaus.er.rbox.new;
          _newStatus2[3] += this.cntSubStaus.er.rbox.ready;
          _newStatus2[4] += this.cntSubStaus.er.rbox.reuse;
        }

        if (regionTxt == "NR") {
          _newStatus1[0] += this.cntSubStaus.nr.rbox.dead;
          _newStatus1[1] += this.cntSubStaus.nr.rbox.offline;
          _newStatus1[2] += this.cntSubStaus.nr.rbox.online;

          _newStatus2[0] += this.cntSubStaus.nr.rbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.nr.rbox.unlist;
          _newStatus2[2] += this.cntSubStaus.nr.rbox.new;
          _newStatus2[3] += this.cntSubStaus.nr.rbox.ready;
          _newStatus2[4] += this.cntSubStaus.nr.rbox.reuse;
        }

        if (regionTxt == "NER") {
          _newStatus1[0] += this.cntSubStaus.ner.rbox.dead;
          _newStatus1[1] += this.cntSubStaus.ner.rbox.offline;
          _newStatus1[2] += this.cntSubStaus.ner.rbox.online;

          _newStatus2[0] += this.cntSubStaus.ner.rbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.ner.rbox.unlist;
          _newStatus2[2] += this.cntSubStaus.ner.rbox.new;
          _newStatus2[3] += this.cntSubStaus.ner.rbox.ready;
          _newStatus2[4] += this.cntSubStaus.ner.rbox.reuse;
        }

        if (regionTxt == "SR") {
          _newStatus1[0] += this.cntSubStaus.sr.rbox.dead;
          _newStatus1[1] += this.cntSubStaus.sr.rbox.offline;
          _newStatus1[2] += this.cntSubStaus.sr.rbox.online;

          _newStatus2[0] += this.cntSubStaus.sr.rbox.maintanance;
          _newStatus2[1] += this.cntSubStaus.sr.rbox.unlist;
          _newStatus2[2] += this.cntSubStaus.sr.rbox.new;
          _newStatus2[3] += this.cntSubStaus.sr.rbox.ready;
          _newStatus2[4] += this.cntSubStaus.sr.rbox.reuse;
        }
      }

      if (myChart != null) {
        let _xtotal =
          _newData[0] + _newData[1] + _newData[2] + _newData[3] + _newData[4] + _newData[5];
        myChart.config.data.datasets[0].data = [
          _newData[0] == 0 ? "N/A" : _newData[0],
          _newData[1] == 0 ? "N/A" : _newData[1],
          _newData[2] == 0 ? "N/A" : _newData[2],
          _newData[3] == 0 ? "N/A" : _newData[3],
          _newData[4] == 0 ? "N/A" : _newData[4],
          _newData[5] == 0 ? "N/A" : _newData[5],
        ];
        myChart.$plugins.descriptors[2].options.labels[0].text =
          _xtotal.toLocaleString();
        
        myChart.update();
      }

      if (_myChart != null) {
        let _total = _newStatus1[0] + _newStatus1[1] + _newStatus1[2];
        if (_total == 0) {
          document.getElementById("statusChart1").style.display = "none";
        } else {
          document.getElementById("statusChart1").style.display = "";
        }
        _myChart.config.data.datasets[0].data = [
          _newStatus1[0] == 0 ? "N/A" : _newStatus1[0],
          _newStatus1[1] == 0 ? "N/A" : _newStatus1[1],
          _newStatus1[2] == 0 ? "N/A" : _newStatus1[2],
        ];

        _myChart.$plugins.descriptors[3].options.labels[0].text = _total;
        _myChart.update();
      }

      if (_myChart1 != null) {
        let _total1 =
          _newStatus2[0] +
          _newStatus2[1] +
          _newStatus2[2] +
          _newStatus2[3] +
          _newStatus2[4];
        if (_total1 == 0) {
          document.getElementById("statusChart2").style.display = "none";
        } else {
          document.getElementById("statusChart2").style.display = "";
        }
        _myChart1.config.data.datasets[0].data = [
          _newStatus2[0] == 0 ? "N/A" : _newStatus2[0],
          _newStatus2[1] == 0 ? "N/A" : _newStatus2[1],
          _newStatus2[2] == 0 ? "N/A" : _newStatus2[2],
          _newStatus2[3] == 0 ? "N/A" : _newStatus2[3],
          _newStatus2[4] == 0 ? "N/A" : _newStatus2[4],
        ];
        _myChart1.$plugins.descriptors[3].options.labels[0].text = _total1;
        _myChart1.update();
      }
    },
  },
  watch: {
    selType(newvalue, oldvalue) {
      this.updateChart();
    },
  },
  mounted() {
    this.$swal.fire({
      title: "Loading...",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        this.$swal.showLoading();
      },
    });

    DeviceMgmtApi.ChartInfo()
      .then((response) => {
        if (response.status == 200) {
          // Device Except -> MOCOMS PJ
          response.data = response.data.filter( (x) => x.pj_id != `${process.env.VUE_APP_MVCOMS_PROJECTID}`);
          this.cntRegion.bkk = 0;
          this.cntRegion.cr = 0;
          this.cntRegion.er = 0;
          this.cntRegion.nr = 0;
          this.cntRegion.ner = 0;

          response.data.forEach((_ele, index, arr) => {
            let _now = new Date();
            let _offline_period = parseInt(_ele.offline_period);
            let _dead_period = parseInt(_ele.lost_period);

            let _offline_border = _now.setMinutes(
              _now.getMinutes() - _offline_period
            );
            let _dead_border = _now.setMinutes(
              _now.getMinutes() - _dead_period
            );

            // 1 online, 2 offline, 3 dead, 4 maintanance, 5 unlist, 6 new, 7 ready to implement, 8 reuse
            let _currentStatus = 1;
            let _currentLastUpdate = new Date(parseInt(_ele.last_update));
            if (_ele.maintenance == "true") {
              // Maintanance
              _currentStatus = 4;
            } else {
              if (_ele.pj_name == "UNLIST") {
                _currentStatus = 5;
              } else if (_ele.pj_name == "INVENTORY") {
                if (_ele.last_update == "Invalid Date") {
                  // New
                  _currentStatus = 6;
                } else {
                  // Ready To Implement
                  _currentStatus = 7;
                }
              } else if (_ele.pj_name == "REUSE") {
                _currentStatus = 8;
              } else {
                if (_currentLastUpdate > _offline_border) {
                  // Online
                  _currentStatus = 1;
                } else {
                  if (_dead_border > _currentLastUpdate) {
                    // Dead
                    _currentStatus = 3;
                  } else {
                    // Offline
                    _currentStatus = 2;
                  }
                }
              }
            }

            this.cntRegion[_ele.region.toLowerCase()] = this.cntRegion[_ele.region.toLowerCase()] + 1;
            this.cntSubRegion[_ele.region.toLowerCase()][
              _ele.type.replace("-", "").toLowerCase()
            ] =
              this.cntSubRegion[_ele.region.toLowerCase()][
                _ele.type.replace("-", "").toLowerCase()
              ] + 1;

  
            switch (_currentStatus) {
              case 2:
                this.cntStatus[_ele.region.toLowerCase()]["offline"] = this.cntStatus[_ele.region.toLowerCase()]["offline"] + 1;
                this.cntSubStaus[_ele.region.toLowerCase()][
                  _ele.type.replace("-", "").toLowerCase()
                ]["offline"] =
                  this.cntSubStaus[_ele.region.toLowerCase()][
                    _ele.type.replace("-", "").toLowerCase()
                  ]["offline"] + 1;
                break;
              case 3:
                this.cntStatus[_ele.region.toLowerCase()]["dead"] = this.cntStatus[_ele.region.toLowerCase()]["dead"] + 1;
                this.cntSubStaus[_ele.region.toLowerCase()][
                  _ele.type.replace("-", "").toLowerCase()
                ]["dead"] =
                  this.cntSubStaus[_ele.region.toLowerCase()][
                    _ele.type.replace("-", "").toLowerCase()
                  ]["dead"] + 1;
                break;
              case 4:
                this.cntStatus[_ele.region.toLowerCase()]["maintanance"] = this.cntStatus[_ele.region.toLowerCase()]["maintanance"] + 1;
                this.cntSubStaus[_ele.region.toLowerCase()][
                  _ele.type.replace("-", "").toLowerCase()
                ]["maintanance"] =
                  this.cntSubStaus[_ele.region.toLowerCase()][
                    _ele.type.replace("-", "").toLowerCase()
                  ]["maintanance"] + 1;
                break;
              case 5:
                this.cntStatus[_ele.region.toLowerCase()]["unlist"] = this.cntStatus[_ele.region.toLowerCase()]["unlist"] + 1;
                this.cntSubStaus[_ele.region.toLowerCase()][
                  _ele.type.replace("-", "").toLowerCase()
                ]["unlist"] =
                  this.cntSubStaus[_ele.region.toLowerCase()][
                    _ele.type.replace("-", "").toLowerCase()
                  ]["unlist"] + 1;
                break;
              case 6:
                this.cntStatus[_ele.region.toLowerCase()]["new"] = this.cntStatus[_ele.region.toLowerCase()]["new"] + 1;
                this.cntSubStaus[_ele.region.toLowerCase()][
                  _ele.type.replace("-", "").toLowerCase()
                ]["new"] =
                  this.cntSubStaus[_ele.region.toLowerCase()][
                    _ele.type.replace("-", "").toLowerCase()
                  ]["new"] + 1;
                break;
              case 7:
                this.cntStatus[_ele.region.toLowerCase()]["ready"] = this.cntStatus[_ele.region.toLowerCase()]["ready"] + 1;
                this.cntSubStaus[_ele.region.toLowerCase()][
                  _ele.type.replace("-", "").toLowerCase()
                ]["ready"] =
                  this.cntSubStaus[_ele.region.toLowerCase()][
                    _ele.type.replace("-", "").toLowerCase()
                  ]["ready"] + 1;
                break;
              case 8:
                this.cntStatus[_ele.region.toLowerCase()]["reuse"] = this.cntStatus[_ele.region.toLowerCase()]["reuse"] + 1;
                this.cntSubStaus[_ele.region.toLowerCase()][
                  _ele.type.replace("-", "").toLowerCase()
                ]["reuse"] =
                  this.cntSubStaus[_ele.region.toLowerCase()][
                    _ele.type.replace("-", "").toLowerCase()
                  ]["reuse"] + 1;
                break;
              default:
                this.cntStatus[_ele.region.toLowerCase()]["online"] = this.cntStatus[_ele.region.toLowerCase()]["online"] + 1;
                this.cntSubStaus[_ele.region.toLowerCase()][
                  _ele.type.replace("-", "").toLowerCase()
                ]["online"] =
                  parseInt(
                    this.cntSubStaus[_ele.region.toLowerCase()][
                      _ele.type.replace("-", "").toLowerCase()
                    ]["online"]
                  ) + 1;
                break;
            }
          });

          // Complete
          let dataregionChart = {
            labels: ["BKK", "CR", "ER", "NR", "NER", "SR"],
            selType: this.selType,
            cntSubStaus: this.cntSubStaus,
            cntStatus: this.cntStatus,
            datasets: [
              {
                label: "My First Dataset",
                data: [
                  this.cntRegion.bkk == 0 ? "N/A" : this.cntRegion.bkk,
                  this.cntRegion.cr == 0 ? "N/A" : this.cntRegion.cr,
                  this.cntRegion.er == 0 ? "N/A" : this.cntRegion.er,
                  this.cntRegion.nr == 0 ? "N/A" : this.cntRegion.nr,
                  this.cntRegion.ner == 0 ? "N/A" : this.cntRegion.ner,
                  this.cntRegion.sr == 0 ? "N/A" : this.cntRegion.sr,
                ],
                backgroundColor: [
                  "#65647C",
                  "#8B7E74",
                  "#C7BCA1",
                  "#F1D3B3",
                  "#D6E4E5",
                  "#497174"
                ],
                hoverOffset: 4,
              },
            ],
          };

          // let chartStatus = Chart.getChart("regionChart"); // <canvas> id
          // if (chartStatus != undefined) {
          //   chartStatus.destroy();
          // }

          this.createChart(dataregionChart);
          
          // let _ctx = document.getElementById("regionChart");
          // let chartStatus = new Chart(_ctx);
          // if (chartStatus != undefined) {
          //   chartStatus.destroy();
          //   this.updateChart();
          // }

          var self = this;
          let _totalx = (
            this.cntRegion.bkk +
            this.cntRegion.cr +
            this.cntRegion.er +
            this.cntRegion.nr +
            this.cntRegion.ner +
            this.cntRegion.sr
          ).toLocaleString();
          myChart = new Chart(document.getElementById("regionChart"), {
            type: "outlabeledDoughnut",
            data: dataregionChart,
            options: {
              // layout: {
              //   padding: 50,
              // },
              title: {
                display: true,
              },
              aspectRatio: 1,
              responsive: true,
              plugins: {
                legend: false,
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
                doughnutlabel: {
                  labels: [
                    {
                      text: _totalx,
                      font: {
                        size: 18,
                      },
                      color: "#3B3B38",
                    },
                  ],
                },
              },
              onClick: function (event, chartElements) {
                if (chartElements) {
                  let _region = dataregionChart.labels[chartElements[0]._index];
                  regionTxt = _region;
                  self.updateChart();
                }
              },
            },
          });

          this.loading = true;

          this.$swal.close();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Old
    // ProjectApi.PhpProjectListEDSS()
    //   .then((response) => {
    //     // 1 online, 2 offline, 3 dead, 4 maintanance, 5 unlist, 6 new, 7 ready to implement, 8 reuse
    //     let _projects = response.data;
    //     //let _projects = response.data.filter( (x) => x.name != "REUSE" && x.name != "INVENTORY" && x.name != "UNLIST");

    //     this.cntRegion.bkk = 0;
    //     this.cntRegion.cr = 0;
    //     this.cntRegion.er = 0;
    //     this.cntRegion.nr = 0;
    //     this.cntRegion.ner = 0;

    //     this.cntStatus.bk = {
    //       bkk: {
    //         online: 0,
    //         offline: 0,
    //         dead: 0,
    //         maintanance: 0,
    //         unlist: 0,
    //         new: 0,
    //         ready: 0,
    //         reuse: 0,
    //       },
    //       cr: {
    //         online: 0,
    //         offline: 0,
    //         dead: 0,
    //         maintanance: 0,
    //         unlist: 0,
    //         new: 0,
    //         ready: 0,
    //         reuse: 0,
    //       },
    //       er: {
    //         online: 0,
    //         offline: 0,
    //         dead: 0,
    //         maintanance: 0,
    //         unlist: 0,
    //         new: 0,
    //         ready: 0,
    //         reuse: 0,
    //       },
    //       nr: {
    //         online: 0,
    //         offline: 0,
    //         dead: 0,
    //         maintanance: 0,
    //         unlist: 0,
    //         new: 0,
    //         ready: 0,
    //         reuse: 0,
    //       },
    //       ner: {
    //         online: 0,
    //         offline: 0,
    //         dead: 0,
    //         maintanance: 0,
    //         unlist: 0,
    //         new: 0,
    //         ready: 0,
    //         reuse: 0,
    //       },
    //     };

    //     // Find Device
    //     _projects.forEach((ele, index, arr) => {
    //       ProjectApi.GetListScope(ele.id)
    //         .then((_res) => {
    //           let _now = new Date();
    //           let _offline_period = _res.find((o) => o.key === "offline_period")
    //             ? _res.find((o) => o.key === "offline_period").value
    //             : 0;
    //           let _dead_period = _res.find((o) => o.key === "lost_period")
    //             ? _res.find((o) => o.key === "lost_period").value
    //             : 0;

    //           // let _abox = this.selType.includes(0) ? "1" : "0";
    //           // let _wbox = this.selType.includes(1) ? "1" : "0";
    //           // let _vabox = this.selType.includes(2) ? "1" : "0";
    //           // let _rbox = this.selType.includes(3) ? "1" : "0";
    //           // let _thbox = this.selType.includes(4) ? "1" : "0";
    //           // let typeCode = "" + _abox + _wbox + _vabox + _rbox + _thbox;

    //           DeviceMgmtApi.DeviceList(ele.id, "All")
    //             .then((res) => {
    //               if (res.status == 200) {
    //                 // Cnt Region
    //                 this.cntRegion.bkk =
    //                   parseInt(this.cntRegion.bkk) +
    //                   parseInt(
    //                     res.data.filter((o) => o.region === "BKK").length
    //                   );

    //                 this.cntRegion.cr =
    //                   parseInt(this.cntRegion.cr) +
    //                   parseInt(
    //                     res.data.filter((o) => o.region === "CR").length
    //                   );
    //                 this.cntRegion.er =
    //                   parseInt(this.cntRegion.er) +
    //                   parseInt(
    //                     res.data.filter((o) => o.region === "ER").length
    //                   );
    //                 this.cntRegion.nr =
    //                   parseInt(this.cntRegion.nr) +
    //                   parseInt(
    //                     res.data.filter((o) => o.region === "NR").length
    //                   );
    //                 this.cntRegion.ner =
    //                   parseInt(this.cntRegion.ner) +
    //                   parseInt(
    //                     res.data.filter((o) => o.region === "NER").length
    //                   );

    //                 this.cntSubRegion.bkk.abox =
    //                   parseInt(this.cntSubRegion.bkk.abox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "BKK" && o.type === "A-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.bkk.wbox =
    //                   parseInt(this.cntSubRegion.bkk.wbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "BKK" && o.type === "W-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.bkk.vabox =
    //                   parseInt(this.cntSubRegion.bkk.vabox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "BKK" && o.type === "VA-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.bkk.thbox =
    //                   parseInt(this.cntSubRegion.bkk.thbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "BKK" && o.type === "TH-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.bkk.rbox =
    //                   parseInt(this.cntSubRegion.bkk.rbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "BKK" && o.type === "R-Box"
    //                     ).length
    //                   );

    //                 this.cntSubRegion.cr.abox =
    //                   parseInt(this.cntSubRegion.cr.abox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "CR" && o.type === "A-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.cr.wbox =
    //                   parseInt(this.cntSubRegion.cr.wbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "CR" && o.type === "W-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.cr.vabox =
    //                   parseInt(this.cntSubRegion.cr.vabox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "CR" && o.type === "VA-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.cr.thbox =
    //                   parseInt(this.cntSubRegion.cr.thbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "CR" && o.type === "TH-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.cr.rbox =
    //                   parseInt(this.cntSubRegion.cr.rbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "CR" && o.type === "R-Box"
    //                     ).length
    //                   );

    //                 this.cntSubRegion.er.abox =
    //                   parseInt(this.cntSubRegion.er.abox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "ER" && o.type === "A-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.er.wbox =
    //                   parseInt(this.cntSubRegion.er.wbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "ER" && o.type === "W-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.er.vabox =
    //                   parseInt(this.cntSubRegion.er.vabox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "ER" && o.type === "VA-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.er.thbox =
    //                   parseInt(this.cntSubRegion.er.thbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "ER" && o.type === "TH-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.er.rbox =
    //                   parseInt(this.cntSubRegion.er.rbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "ER" && o.type === "R-Box"
    //                     ).length
    //                   );

    //                 this.cntSubRegion.nr.abox =
    //                   parseInt(this.cntSubRegion.nr.abox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NR" && o.type === "A-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.nr.wbox =
    //                   parseInt(this.cntSubRegion.nr.wbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NR" && o.type === "W-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.nr.vabox =
    //                   parseInt(this.cntSubRegion.nr.vabox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NR" && o.type === "VA-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.nr.thbox =
    //                   parseInt(this.cntSubRegion.nr.thbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NR" && o.type === "TH-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.nr.rbox =
    //                   parseInt(this.cntSubRegion.nr.rbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NR" && o.type === "R-Box"
    //                     ).length
    //                   );

    //                 this.cntSubRegion.ner.abox =
    //                   parseInt(this.cntSubRegion.ner.abox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NER" && o.type === "A-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.ner.wbox =
    //                   parseInt(this.cntSubRegion.ner.wbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NER" && o.type === "W-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.ner.vabox =
    //                   parseInt(this.cntSubRegion.ner.vabox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NER" && o.type === "VA-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.ner.thbox =
    //                   parseInt(this.cntSubRegion.ner.thbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NER" && o.type === "TH-Box"
    //                     ).length
    //                   );
    //                 this.cntSubRegion.ner.rbox =
    //                   parseInt(this.cntSubRegion.ner.rbox) +
    //                   parseInt(
    //                     res.data.filter(
    //                       (o) => o.region === "NER" && o.type === "R-Box"
    //                     ).length
    //                   );

    //                 if (ele.name == "UNLIST") {
    //                   this.cntStatus.bkk.unlist =
    //                     parseInt(this.cntStatus.bkk.unlist) +
    //                     parseInt(
    //                       res.data.filter((o) => o.region === "BKK").length
    //                     );
    //                   this.cntStatus.cr.unlist =
    //                     parseInt(this.cntStatus.cr.unlist) +
    //                     parseInt(
    //                       res.data.filter((o) => o.region === "CR").length
    //                     );
    //                   this.cntStatus.er.unlist =
    //                     parseInt(this.cntStatus.er.unlist) +
    //                     parseInt(
    //                       res.data.filter((o) => o.region === "ER").length
    //                     );
    //                   this.cntStatus.nr.unlist =
    //                     parseInt(this.cntStatus.nr.unlist) +
    //                     parseInt(
    //                       res.data.filter((o) => o.region === "NR").length
    //                     );
    //                   this.cntStatus.ner.unlist =
    //                     parseInt(this.cntStatus.ner.unlist) +
    //                     parseInt(
    //                       res.data.filter((o) => o.region === "NER").length
    //                     );

    //                   /*-------*/

    //                   this.cntSubStaus.bkk.abox.unlist =
    //                     parseInt(this.cntSubStaus.bkk.abox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "BKK" && o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.wbox.unlist =
    //                     parseInt(this.cntSubStaus.bkk.wbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "BKK" && o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.vabox.unlist =
    //                     parseInt(this.cntSubStaus.bkk.vabox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "BKK" && o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.thbox.unlist =
    //                     parseInt(this.cntSubStaus.bkk.thbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "BKK" && o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.rbox.unlist =
    //                     parseInt(this.cntSubStaus.bkk.rbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "BKK" && o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.cr.abox.unlist =
    //                     parseInt(this.cntSubStaus.cr.abox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "CR" && o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.wbox.unlist =
    //                     parseInt(this.cntSubStaus.cr.wbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "CR" && o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.vabox.unlist =
    //                     parseInt(this.cntSubStaus.cr.vabox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "CR" && o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.thbox.unlist =
    //                     parseInt(this.cntSubStaus.cr.thbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "CR" && o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.rbox.unlist =
    //                     parseInt(this.cntSubStaus.cr.rbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "CR" && o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.er.abox.unlist =
    //                     parseInt(this.cntSubStaus.er.abox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "ER" && o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.wbox.unlist =
    //                     parseInt(this.cntSubStaus.er.wbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "ER" && o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.vabox.unlist =
    //                     parseInt(this.cntSubStaus.er.vabox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "ER" && o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.thbox.unlist =
    //                     parseInt(this.cntSubStaus.er.thbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "ER" && o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.rbox.unlist =
    //                     parseInt(this.cntSubStaus.er.rbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "ER" && o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.nr.abox.unlist =
    //                     parseInt(this.cntSubStaus.nr.abox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NR" && o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.wbox.unlist =
    //                     parseInt(this.cntSubStaus.nr.wbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NR" && o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.vabox.unlist =
    //                     parseInt(this.cntSubStaus.nr.vabox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NR" && o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.thbox.unlist =
    //                     parseInt(this.cntSubStaus.nr.thbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NR" && o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.rbox.unlist =
    //                     parseInt(this.cntSubStaus.nr.rbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NR" && o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.ner.abox.unlist =
    //                     parseInt(this.cntSubStaus.ner.abox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NER" && o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.wbox.unlist =
    //                     parseInt(this.cntSubStaus.ner.wbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NER" && o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.vabox.unlist =
    //                     parseInt(this.cntSubStaus.ner.vabox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NER" && o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.thbox.unlist =
    //                     parseInt(this.cntSubStaus.ner.thbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NER" && o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.rbox.unlist =
    //                     parseInt(this.cntSubStaus.ner.rbox.unlist) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NER" && o.type == "R-Box"
    //                       ).length
    //                     );
    //                 } else if (ele.name == "INVENTORY") {
    //                   this.cntStatus.bkk.new =
    //                     parseInt(this.cntStatus.bkk.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.cr.new =
    //                     parseInt(this.cntStatus.cr.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.er.new =
    //                     parseInt(this.cntStatus.er.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.nr.new =
    //                     parseInt(this.cntStatus.nr.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.ner.new =
    //                     parseInt(this.cntStatus.ner.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );

    //                   /* ------ */

    //                   this.cntSubStaus.bkk.abox.new =
    //                     parseInt(this.cntSubStaus.bkk.abox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.wbox.new =
    //                     parseInt(this.cntSubStaus.bkk.wbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.vabox.new =
    //                     parseInt(this.cntSubStaus.bkk.vabox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.thbox.new =
    //                     parseInt(this.cntSubStaus.bkk.thbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.rbox.new =
    //                     parseInt(this.cntSubStaus.bkk.rbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.cr.abox.new =
    //                     parseInt(this.cntSubStaus.cr.abox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.wbox.new =
    //                     parseInt(this.cntSubStaus.cr.wbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.vabox.new =
    //                     parseInt(this.cntSubStaus.cr.vabox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.thbox.new =
    //                     parseInt(this.cntSubStaus.cr.thbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.rbox.new =
    //                     parseInt(this.cntSubStaus.cr.rbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.er.abox.new =
    //                     parseInt(this.cntSubStaus.er.abox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.wbox.new =
    //                     parseInt(this.cntSubStaus.er.wbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.vabox.new =
    //                     parseInt(this.cntSubStaus.er.vabox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.thbox.new =
    //                     parseInt(this.cntSubStaus.er.thbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.rbox.new =
    //                     parseInt(this.cntSubStaus.er.rbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.nr.abox.new =
    //                     parseInt(this.cntSubStaus.nr.abox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.wbox.new =
    //                     parseInt(this.cntSubStaus.nr.wbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.vabox.new =
    //                     parseInt(this.cntSubStaus.nr.vabox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.thbox.new =
    //                     parseInt(this.cntSubStaus.nr.thbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.rbox.new =
    //                     parseInt(this.cntSubStaus.nr.rbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.ner.abox.new =
    //                     parseInt(this.cntSubStaus.ner.abox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.wbox.new =
    //                     parseInt(this.cntSubStaus.ner.wbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.vabox.new =
    //                     parseInt(this.cntSubStaus.ner.vabox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.thbox.new =
    //                     parseInt(this.cntSubStaus.ner.thbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.rbox.new =
    //                     parseInt(this.cntSubStaus.ner.rbox.new) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update == null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntStatus.bkk.ready =
    //                     parseInt(this.cntStatus.bkk.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.cr.ready =
    //                     parseInt(this.cntStatus.cr.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.er.ready =
    //                     parseInt(this.cntStatus.er.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.nr.ready =
    //                     parseInt(this.cntStatus.nr.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.ner.ready =
    //                     parseInt(this.cntStatus.ner.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true"
    //                       ).length
    //                     );

    //                   /* -- */

    //                   this.cntSubStaus.bkk.abox.ready =
    //                     parseInt(this.cntSubStaus.bkk.abox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.wbox.ready =
    //                     parseInt(this.cntSubStaus.bkk.wbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.vabox.ready =
    //                     parseInt(this.cntSubStaus.bkk.vabox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.thbox.ready =
    //                     parseInt(this.cntSubStaus.bkk.thbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.rbox.ready =
    //                     parseInt(this.cntSubStaus.bkk.rbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.cr.abox.ready =
    //                     parseInt(this.cntSubStaus.cr.abox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.wbox.ready =
    //                     parseInt(this.cntSubStaus.cr.wbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.vabox.ready =
    //                     parseInt(this.cntSubStaus.cr.vabox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.thbox.ready =
    //                     parseInt(this.cntSubStaus.cr.thbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.rbox.ready =
    //                     parseInt(this.cntSubStaus.cr.rbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.er.abox.ready =
    //                     parseInt(this.cntSubStaus.er.abox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.wbox.ready =
    //                     parseInt(this.cntSubStaus.er.wbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.vabox.ready =
    //                     parseInt(this.cntSubStaus.er.vabox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.thbox.ready =
    //                     parseInt(this.cntSubStaus.er.thbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.rbox.ready =
    //                     parseInt(this.cntSubStaus.er.rbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.nr.abox.ready =
    //                     parseInt(this.cntSubStaus.nr.abox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.wbox.ready =
    //                     parseInt(this.cntSubStaus.nr.wbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.vabox.ready =
    //                     parseInt(this.cntSubStaus.nr.vabox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.thbox.ready =
    //                     parseInt(this.cntSubStaus.nr.thbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.rbox.ready =
    //                     parseInt(this.cntSubStaus.nr.rbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.ner.abox.ready =
    //                     parseInt(this.cntSubStaus.ner.abox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.wbox.ready =
    //                     parseInt(this.cntSubStaus.ner.wbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.vabox.ready =
    //                     parseInt(this.cntSubStaus.ner.vabox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.thbox.ready =
    //                     parseInt(this.cntSubStaus.ner.thbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.rbox.ready =
    //                     parseInt(this.cntSubStaus.ner.rbox.ready) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.last_update != null &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   /* -- */

    //                   this.cntStatus.bkk.maintanance =
    //                     parseInt(this.cntStatus.bkk.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "BKK" && o.maintenance == "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.cr.maintanance =
    //                     parseInt(this.cntStatus.cr.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "CR" && o.maintenance == "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.er.maintanance =
    //                     parseInt(this.cntStatus.er.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "ER" && o.maintenance == "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.nr.maintanance =
    //                     parseInt(this.cntStatus.nr.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NR" && o.maintenance == "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.ner.maintanance =
    //                     parseInt(this.cntStatus.ner.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NER" && o.maintenance == "true"
    //                       ).length
    //                     );

    //                   /* -- */

    //                   this.cntSubStaus.bkk.abox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.cr.abox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.er.abox.maintanance =
    //                     parseInt(this.cntSubStaus.er.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.er.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.er.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.er.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.er.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.nr.abox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.ner.abox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   /* -- */
    //                 } else if (ele.name == "REUSE") {
    //                   this.cntStatus.bkk.reuse =
    //                     parseInt(this.cntStatus.bkk.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "BKK" && o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.cr.reuse =
    //                     parseInt(this.cntStatus.cr.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "CR" && o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.er.reuse =
    //                     parseInt(this.cntStatus.er.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "ER" && o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.nr.reuse =
    //                     parseInt(this.cntStatus.nr.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NR" && o.maintenance != "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.ner.reuse =
    //                     parseInt(this.cntStatus.ner.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NER" && o.maintenance != "true"
    //                       ).length
    //                     );

    //                   /* -- */

    //                   this.cntSubStaus.bkk.abox.reuse =
    //                     parseInt(this.cntSubStaus.bkk.abox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.wbox.reuse =
    //                     parseInt(this.cntSubStaus.bkk.wbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.vabox.reuse =
    //                     parseInt(this.cntSubStaus.bkk.vabox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.thbox.reuse =
    //                     parseInt(this.cntSubStaus.bkk.thbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.rbox.reuse =
    //                     parseInt(this.cntSubStaus.bkk.rbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.cr.abox.reuse =
    //                     parseInt(this.cntSubStaus.cr.abox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.wbox.reuse =
    //                     parseInt(this.cntSubStaus.cr.wbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.vabox.reuse =
    //                     parseInt(this.cntSubStaus.cr.vabox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.thbox.reuse =
    //                     parseInt(this.cntSubStaus.cr.thbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.rbox.reuse =
    //                     parseInt(this.cntSubStaus.cr.rbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.er.abox.reuse =
    //                     parseInt(this.cntSubStaus.er.abox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.wbox.reuse =
    //                     parseInt(this.cntSubStaus.er.wbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.vabox.reuse =
    //                     parseInt(this.cntSubStaus.er.vabox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.thbox.reuse =
    //                     parseInt(this.cntSubStaus.er.thbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.rbox.reuse =
    //                     parseInt(this.cntSubStaus.er.rbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.nr.abox.reuse =
    //                     parseInt(this.cntSubStaus.nr.abox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.wbox.reuse =
    //                     parseInt(this.cntSubStaus.nr.wbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.vabox.reuse =
    //                     parseInt(this.cntSubStaus.nr.vabox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.thbox.reuse =
    //                     parseInt(this.cntSubStaus.nr.thbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.rbox.reuse =
    //                     parseInt(this.cntSubStaus.nr.rbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.ner.abox.reuse =
    //                     parseInt(this.cntSubStaus.ner.abox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.wbox.reuse =
    //                     parseInt(this.cntSubStaus.ner.wbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.vabox.reuse =
    //                     parseInt(this.cntSubStaus.ner.vabox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.thbox.reuse =
    //                     parseInt(this.cntSubStaus.ner.thbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.rbox.reuse =
    //                     parseInt(this.cntSubStaus.ner.rbox.reuse) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance != "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   /* -- */

    //                   this.cntStatus.bkk.maintanance =
    //                     parseInt(this.cntStatus.bkk.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "BKK" && o.maintenance == "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.cr.maintanance =
    //                     parseInt(this.cntStatus.cr.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "CR" && o.maintenance == "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.er.maintanance =
    //                     parseInt(this.cntStatus.er.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "ER" && o.maintenance == "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.nr.maintanance =
    //                     parseInt(this.cntStatus.nr.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NR" && o.maintenance == "true"
    //                       ).length
    //                     );
    //                   this.cntStatus.ner.maintanance =
    //                     parseInt(this.cntStatus.ner.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) => o.region === "NER" && o.maintenance == "true"
    //                       ).length
    //                     );

    //                   /* -- */

    //                   this.cntSubStaus.bkk.abox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.bkk.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.bkk.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "BKK" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.cr.abox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.cr.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.cr.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "CR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.er.abox.maintanance =
    //                     parseInt(this.cntSubStaus.er.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.er.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.er.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.er.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.er.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.er.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "ER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.nr.abox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.nr.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.nr.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NR" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   this.cntSubStaus.ner.abox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.abox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "A-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.wbox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.wbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "W-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.vabox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.vabox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "VA-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.thbox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.thbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "TH-Box"
    //                       ).length
    //                     );
    //                   this.cntSubStaus.ner.rbox.maintanance =
    //                     parseInt(this.cntSubStaus.ner.rbox.maintanance) +
    //                     parseInt(
    //                       res.data.filter(
    //                         (o) =>
    //                           o.region === "NER" &&
    //                           o.maintenance == "true" &&
    //                           o.type == "R-Box"
    //                       ).length
    //                     );

    //                   /* -- */
    //                 } else {
    //                   //console.log(res);

    //                   // Cnt Status
    //                   res.data.forEach((_ele, _ix) => {
    //                     let _currentStatus = 1; // 1 online, 2 offline, 3 dead, 4 maintanance
    //                     let _currentLastUpdate = new Date(
    //                       parseInt(_ele.last_update)
    //                     );
    //                     let _offline_border = _now.setMinutes(
    //                       _now.getMinutes() - _offline_period
    //                     );
    //                     let _dead_border = _now.setMinutes(
    //                       _now.getMinutes() - _dead_period
    //                     );

    //                     //console.log(_ele.maintenance);

    //                     if (_ele.last_update == "Invalid Date") {
    //                       // New
    //                       _currentStatus = 5;
    //                     } else {
    //                       if (_ele.maintenance == "true") {
    //                         // Maintanance
    //                         _currentStatus = 4;
    //                       } else {
    //                         if (_currentLastUpdate > _offline_border) {
    //                           _currentStatus = 1;
    //                         } // Online
    //                         else {
    //                           if (_dead_border > _currentLastUpdate) {
    //                             _currentStatus = 3;
    //                           } // Dead
    //                           else {
    //                             _currentStatus = 2;
    //                           } // Offline
    //                         }
    //                       }
    //                     }

    //                     //console.log(_currentStatus);

    //                     if (_ele.region == "BKK") {
    //                       if (_currentStatus == 1) {
    //                         this.cntStatus.bkk.online =
    //                           this.cntStatus.bkk.online + 1;
    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.bkk.abox.online =
    //                             this.cntSubStaus.bkk.abox.online + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.bkk.wbox.online =
    //                             this.cntSubStaus.bkk.wbox.online + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.bkk.vabox.online =
    //                             this.cntSubStaus.bkk.vabox.online + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.bkk.thbox.online =
    //                             this.cntSubStaus.bkk.thbox.online + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.bkk.rbox.online =
    //                             this.cntSubStaus.bkk.rbox.online + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 2) {
    //                         this.cntStatus.bkk.offline =
    //                           this.cntStatus.bkk.offline + 1;
    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.bkk.abox.offline =
    //                             this.cntSubStaus.bkk.abox.offline + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.bkk.wbox.offline =
    //                             this.cntSubStaus.bkk.wbox.offline + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.bkk.vabox.offline =
    //                             this.cntSubStaus.bkk.vabox.offline + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.bkk.thbox.offline =
    //                             this.cntSubStaus.bkk.thbox.offline + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.bkk.rbox.offline =
    //                             this.cntSubStaus.bkk.rbox.offline + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 3) {
    //                         this.cntStatus.bkk.dead =
    //                           this.cntStatus.bkk.dead + 1;
    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.bkk.abox.dead =
    //                             this.cntSubStaus.bkk.abox.dead + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.bkk.wbox.dead =
    //                             this.cntSubStaus.bkk.wbox.dead + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.bkk.vabox.dead =
    //                             this.cntSubStaus.bkk.vabox.dead + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.bkk.thbox.dead =
    //                             this.cntSubStaus.bkk.thbox.dead + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.bkk.rbox.dead =
    //                             this.cntSubStaus.bkk.rbox.dead + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 4) {
    //                         this.cntStatus.bkk.maintanance =
    //                           this.cntStatus.bkk.maintanance + 1;
    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.bkk.abox.maintanance =
    //                             this.cntSubStaus.bkk.abox.maintanance + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.bkk.wbox.maintanance =
    //                             this.cntSubStaus.bkk.wbox.maintanance + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.bkk.vabox.maintanance =
    //                             this.cntSubStaus.bkk.vabox.maintanance + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.bkk.thbox.maintanance =
    //                             this.cntSubStaus.bkk.thbox.maintanance + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.bkk.rbox.maintanance =
    //                             this.cntSubStaus.bkk.rbox.maintanance + 1;
    //                         }

    //                         /* -- */
    //                       } else if (_currentStatus == 5) {
    //                         this.cntStatus.bkk.new = this.cntStatus.bkk.new + 1;
    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.bkk.abox.new =
    //                             this.cntSubStaus.bkk.abox.new + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.bkk.wbox.new =
    //                             this.cntSubStaus.bkk.wbox.new + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.bkk.vabox.new =
    //                             this.cntSubStaus.bkk.vabox.new + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.bkk.thbox.new =
    //                             this.cntSubStaus.bkk.thbox.new + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.bkk.abox.new =
    //                             this.cntSubStaus.bkk.abox.new + 1;
    //                         }

    //                         /* -- */
    //                       }
    //                     } else if (_ele.region == "CR") {
    //                       if (_currentStatus == 1) {
    //                         this.cntStatus.cr.online =
    //                           this.cntStatus.cr.online + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.cr.abox.online =
    //                             this.cntSubStaus.cr.abox.online + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.cr.wbox.online =
    //                             this.cntSubStaus.cr.wbox.online + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.cr.vabox.online =
    //                             this.cntSubStaus.cr.vabox.online + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.cr.thbox.online =
    //                             this.cntSubStaus.cr.thbox.online + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.cr.rbox.online =
    //                             this.cntSubStaus.cr.rbox.online + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 2) {
    //                         this.cntStatus.cr.offline =
    //                           this.cntStatus.cr.offline + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.cr.abox.offline =
    //                             this.cntSubStaus.cr.abox.offline + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.cr.wbox.offline =
    //                             this.cntSubStaus.cr.wbox.offline + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.cr.vabox.offline =
    //                             this.cntSubStaus.cr.vabox.offline + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.cr.thbox.offline =
    //                             this.cntSubStaus.cr.thbox.offline + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.cr.rbox.offline =
    //                             this.cntSubStaus.cr.rbox.offline + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 3) {
    //                         this.cntStatus.cr.dead = this.cntStatus.cr.dead + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.cr.abox.dead =
    //                             this.cntSubStaus.cr.abox.dead + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.cr.wbox.dead =
    //                             this.cntSubStaus.cr.wbox.dead + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.cr.vabox.dead =
    //                             this.cntSubStaus.cr.vabox.dead + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.cr.thbox.dead =
    //                             this.cntSubStaus.cr.thbox.dead + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.cr.rbox.dead =
    //                             this.cntSubStaus.cr.rbox.dead + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 4) {
    //                         this.cntStatus.cr.maintanance =
    //                           this.cntStatus.cr.maintanance + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.cr.abox.maintanance =
    //                             this.cntSubStaus.cr.abox.maintanance + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.cr.wbox.maintanance =
    //                             this.cntSubStaus.cr.wbox.maintanance + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.cr.vabox.maintanance =
    //                             this.cntSubStaus.cr.vabox.maintanance + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.cr.thbox.maintanance =
    //                             this.cntSubStaus.cr.thbox.maintanance + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.cr.rbox.maintanance =
    //                             this.cntSubStaus.cr.rbox.maintanance + 1;
    //                         }
    //                         /* -- */
    //                       }
    //                     } else if (_ele.region == "ER") {
    //                       if (_currentStatus == 1) {
    //                         this.cntStatus.er.online =
    //                           this.cntStatus.er.online + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.er.abox.online =
    //                             this.cntSubStaus.er.abox.online + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.er.wbox.online =
    //                             this.cntSubStaus.er.wbox.online + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.er.vabox.online =
    //                             this.cntSubStaus.er.vabox.online + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.er.thbox.online =
    //                             this.cntSubStaus.er.thbox.online + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.er.rbox.online =
    //                             this.cntSubStaus.er.rbox.online + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 2) {
    //                         this.cntStatus.er.offline =
    //                           this.cntStatus.er.offline + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.er.abox.offline =
    //                             this.cntSubStaus.er.abox.offline + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.er.wbox.offline =
    //                             this.cntSubStaus.er.wbox.offline + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.er.vabox.offline =
    //                             this.cntSubStaus.er.vabox.offline + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.er.thbox.offline =
    //                             this.cntSubStaus.er.thbox.offline + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.er.rbox.offline =
    //                             this.cntSubStaus.er.rbox.offline + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 3) {
    //                         this.cntStatus.er.dead = this.cntStatus.er.dead + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.er.abox.dead =
    //                             this.cntSubStaus.er.abox.dead + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.er.wbox.dead =
    //                             this.cntSubStaus.er.wbox.dead + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.er.vabox.dead =
    //                             this.cntSubStaus.er.vabox.dead + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.er.thbox.dead =
    //                             this.cntSubStaus.er.thbox.dead + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.er.rbox.dead =
    //                             this.cntSubStaus.er.rbox.dead + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 4) {
    //                         this.cntStatus.er.maintanance =
    //                           this.cntStatus.er.maintanance + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.er.abox.maintanance =
    //                             this.cntSubStaus.er.abox.maintanance + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.er.wbox.maintanance =
    //                             this.cntSubStaus.er.wbox.maintanance + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.er.vabox.maintanance =
    //                             this.cntSubStaus.er.vabox.maintanance + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.er.thbox.maintanance =
    //                             this.cntSubStaus.er.thbox.maintanance + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.er.rbox.maintanance =
    //                             this.cntSubStaus.er.rbox.maintanance + 1;
    //                         }
    //                         /* -- */
    //                       }
    //                     } else if (_ele.region == "NR") {
    //                       if (_currentStatus == 1) {
    //                         this.cntStatus.nr.online =
    //                           this.cntStatus.nr.online + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.nr.abox.online =
    //                             this.cntSubStaus.nr.abox.online + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.nr.wbox.online =
    //                             this.cntSubStaus.nr.wbox.online + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.nr.vabox.online =
    //                             this.cntSubStaus.nr.vabox.online + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.nr.thbox.online =
    //                             this.cntSubStaus.nr.thbox.online + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.nr.rbox.online =
    //                             this.cntSubStaus.nr.rbox.online + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 2) {
    //                         this.cntStatus.nr.offline =
    //                           this.cntStatus.nr.offline + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.nr.abox.offline =
    //                             this.cntSubStaus.nr.abox.offline + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.nr.wbox.offline =
    //                             this.cntSubStaus.nr.wbox.offline + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.nr.vabox.offline =
    //                             this.cntSubStaus.nr.vabox.offline + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.nr.thbox.offline =
    //                             this.cntSubStaus.nr.thbox.offline + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.nr.rbox.offline =
    //                             this.cntSubStaus.nr.rbox.offline + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 3) {
    //                         this.cntStatus.nr.dead = this.cntStatus.nr.dead + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.nr.abox.dead =
    //                             this.cntSubStaus.nr.abox.dead + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.nr.wbox.dead =
    //                             this.cntSubStaus.nr.wbox.dead + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.nr.vabox.dead =
    //                             this.cntSubStaus.nr.vabox.dead + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.nr.thbox.dead =
    //                             this.cntSubStaus.nr.thbox.dead + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.nr.rbox.dead =
    //                             this.cntSubStaus.nr.rbox.dead + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 4) {
    //                         this.cntStatus.nr.maintanance =
    //                           this.cntStatus.nr.maintanance + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.nr.abox.maintanance =
    //                             this.cntSubStaus.nr.abox.maintanance + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.nr.wbox.maintanance =
    //                             this.cntSubStaus.nr.wbox.maintanance + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.nr.vabox.maintanance =
    //                             this.cntSubStaus.nr.vabox.maintanance + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.nr.thbox.maintanance =
    //                             this.cntSubStaus.nr.thbox.maintanance + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.nr.rbox.maintanance =
    //                             this.cntSubStaus.nr.rbox.maintanance + 1;
    //                         }
    //                         /* -- */
    //                       }
    //                     } else if (_ele.region == "NER") {
    //                       if (_currentStatus == 1) {
    //                         this.cntStatus.ner.online =
    //                           this.cntStatus.ner.online + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.ner.abox.online =
    //                             this.cntSubStaus.ner.abox.online + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.ner.wbox.online =
    //                             this.cntSubStaus.ner.wbox.online + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.ner.vabox.online =
    //                             this.cntSubStaus.ner.vabox.online + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.ner.thbox.online =
    //                             this.cntSubStaus.ner.thbox.online + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.ner.rbox.online =
    //                             this.cntSubStaus.ner.rbox.online + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 2) {
    //                         this.cntStatus.ner.offline =
    //                           this.cntStatus.ner.offline + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.ner.abox.offline =
    //                             this.cntSubStaus.ner.abox.offline + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.ner.wbox.offline =
    //                             this.cntSubStaus.ner.wbox.offline + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.ner.vabox.offline =
    //                             this.cntSubStaus.ner.vabox.offline + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.ner.thbox.offline =
    //                             this.cntSubStaus.ner.thbox.offline + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.ner.rbox.offline =
    //                             this.cntSubStaus.ner.rbox.offline + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 3) {
    //                         this.cntStatus.ner.dead =
    //                           this.cntStatus.ner.dead + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.ner.abox.dead =
    //                             this.cntSubStaus.ner.abox.dead + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.ner.wbox.dead =
    //                             this.cntSubStaus.ner.wbox.dead + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.ner.vabox.dead =
    //                             this.cntSubStaus.ner.vabox.dead + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.ner.thbox.dead =
    //                             this.cntSubStaus.ner.thbox.dead + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.ner.rbox.dead =
    //                             this.cntSubStaus.ner.rbox.dead + 1;
    //                         }
    //                         /* -- */
    //                       } else if (_currentStatus == 4) {
    //                         this.cntStatus.ner.maintanance =
    //                           this.cntStatus.ner.maintanance + 1;

    //                         /* -- */
    //                         if (_ele.type == "A-Box") {
    //                           this.cntSubStaus.ner.abox.maintanance =
    //                             this.cntSubStaus.ner.abox.maintanance + 1;
    //                         } else if (_ele.type == "W-Box") {
    //                           this.cntSubStaus.ner.wbox.maintanance =
    //                             this.cntSubStaus.ner.wbox.maintanance + 1;
    //                         } else if (_ele.type == "VA-Box") {
    //                           this.cntSubStaus.ner.vabox.maintanance =
    //                             this.cntSubStaus.ner.vabox.maintanance + 1;
    //                         } else if (_ele.type == "TH-Box") {
    //                           this.cntSubStaus.ner.thbox.maintanance =
    //                             this.cntSubStaus.ner.thbox.maintanance + 1;
    //                         } else if (_ele.type == "R-Box") {
    //                           this.cntSubStaus.ner.rbox.maintanance =
    //                             this.cntSubStaus.ner.rbox.maintanance + 1;
    //                         }
    //                         /* -- */
    //                       }
    //                     }
    //                   });
    //                 }
    //               }

    //               // Last Times
    //               if (index === _projects.length - 1) {
    //                 //console.log("Can Your See?");
    //                 //console.log(this.cntStatus);
    //                 //console.log(this.cntRegion);

    //                 // Complete
    //                 const dataregionChart = {
    //                   labels: ["BKK", "CR", "ER", "NR", "NER"],
    //                   selType: this.selType,
    //                   cntSubStaus: this.cntSubStaus,
    //                   cntStatus: this.cntStatus,
    //                   datasets: [
    //                     {
    //                       label: "My First Dataset",
    //                       data: [
    //                         this.cntRegion.bkk == 0
    //                           ? "N/A"
    //                           : this.cntRegion.bkk,
    //                         this.cntRegion.cr == 0 ? "N/A" : this.cntRegion.cr,
    //                         this.cntRegion.er == 0 ? "N/A" : this.cntRegion.er,
    //                         this.cntRegion.nr == 0 ? "N/A" : this.cntRegion.nr,
    //                         this.cntRegion.ner == 0
    //                           ? "N/A"
    //                           : this.cntRegion.ner,
    //                       ],
    //                       backgroundColor: [
    //                         "#aa6f73",
    //                         "#eea990",
    //                         "#f6e0b5",
    //                         "#a39193",
    //                         "#66545e",
    //                       ],
    //                       hoverOffset: 4,
    //                     },
    //                   ],
    //                 };

    //                 // let chartStatus = Chart.getChart("regionChart"); // <canvas> id
    //                 // if (chartStatus != undefined) {
    //                 //   chartStatus.destroy();
    //                 // }

    //                 this.createChart();

    //                 let _ctx = document.getElementById("regionChart");
    //                 let chartStatus = new Chart(_ctx);
    //                 if (chartStatus != undefined) {
    //                   chartStatus.destroy();
    //                   this.updateChart();
    //                 }

    //                 var self = this;
    //                 let _totalx = (this.cntRegion.bkk + this.cntRegion.cr + this.cntRegion.er + this.cntRegion.nr + this.cntRegion.ner).toLocaleString();
    //                 myChart = new Chart(
    //                   document.getElementById("regionChart"),
    //                   {
    //                     type: "outlabeledDoughnut",
    //                     data: dataregionChart,
    //                     options: {
    //                       // layout: {
    //                       //   padding: 50,
    //                       // },
    //                       title: {
    //                         display: true,
    //                       },
    //                       aspectRatio: 1,
    //                       responsive: true,
    //                       plugins: {
    //                         legend: false,
    //                         title: {
    //                           display: true,
    //                           text: "Total",
    //                         },
    //                         outlabels: {
    //                           text: "%l\n%v (%p)",
    //                           color: "white",
    //                           stretch: 40,
    //                           font: {
    //                             resizable: true,
    //                             minSize: 12,
    //                             maxSize: 18,
    //                           },
    //                         },
    //                         doughnutlabel: {
    //                           labels: [
    //                             {
    //                               text: _totalx,
    //                               font: {
    //                                 size: 18,
    //                               },
    //                               color: "#3B3B38",
    //                             },
    //                           ],
    //                         },
    //                       },
    //                       onClick: function (event, chartElements) {
    //                         if (chartElements) {
    //                           let _dataStatus = [];
    //                           let _dataStatus1 = [];
    //                           let _region =
    //                             dataregionChart.labels[chartElements[0]._index];

    //                           regionTxt = _region;

    //                           self.updateChart();
    //                           // let chartStatus = Chart.getChart("statusChart"); // <canvas> id
    //                           // if (chartStatus != undefined) {
    //                           //   chartStatus.destroy();
    //                           // }
    //                         }
    //                       },
    //                     },
    //                   }
    //                 );

    //                 this.loading = true;

    //                 this.$swal.close();
    //               }
    //             })
    //             .catch((errr) => {
    //               console.log(errr);
    //             });
    //         })
    //         .catch((_err) => {
    //           console.log(_err);
    //           let e = _err.response.data;
    //           if (e.status == 401) {
    //             console.log("In");
    //             this.$swal.fire({
    //               icon: "error",
    //               title: "Error",
    //               text: e.message,
    //             });
    //             this.$router.push("/login");
    //           }
    //         });
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>

<style>
#chart-wrapper {
  display: block;
  position: relative;
  /*width: 600px;*/
}

#chart-wrapper-1 {
  display: block;
  position: relative;
  /*width: 500px;*/
}

#chart-wrapper-2 {
  display: block;
  position: relative;
  /*width: 500px;*/
}
</style>
