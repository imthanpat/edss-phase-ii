<template>
  <v-card class="mb-2">
    <v-toolbar
      color="grey darken-4"
      style="background-color: rgb(72, 73, 71) !important"
    >
      <v-toolbar-title
        ><h6 class="text-h6" style="color: white">
          False Managemeter Alarm Logs
        </h6></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container>
      <v-row no-gutters>
        <v-col cols="2" class="pa-2">
          <v-select
            v-model="selected"
            :items="selSearch"
            item-title="txt"
            item-value="val"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-col>
        <v-col cols="6" class="pa-2">
          <v-text-field
            v-model="keyword"
            :counter="255"
            label="Search text"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2">&nbsp;</v-col>
        <v-col cols="6" class="pa-2">
          <Datepicker
            v-model="date"
            range
            :presetRanges="presetRanges"
            placeholder="Select Date"
          >
            <template #yearly="{ label, range, presetDateRange }">
              <span @click="presetDateRange(range)">{{ label }}</span>
            </template>
          </Datepicker>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2">&nbsp;</v-col>
        <v-col cols="6" class="pa-2">
          <v-row no-gutters>
            <v-col>
              <v-checkbox
                v-model="typefilter.abox"
                label="A-Box"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="typefilter.wbox"
                label="W-Box"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="typefilter.vabox"
                label="VA-Box"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="typefilter.rbox"
                label="R-Box"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="typefilter.thbox"
                label="TH-Box"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2">&nbsp;</v-col>
        <v-col cols="6" class="pa-2">
          <v-btn @click="submitSearch" color="success" :disabled="false">
            <span style="color:white;">Submit</span>
          </v-btn>
          <v-btn class="ml-4" @click="resetEvent"> Clear </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <div class="d-flex justify-center">
    <img
      v-if="false"
      src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
      style="width: 200px; height: 150px"
    />
  </div>

  <v-row no-gutters>
    <v-col cols="12" class="pl-16 pr-16">
      <canvas class="ma-12" id="myChart"></canvas>
    </v-col>
    <v-col cols="12" class="pa-2">
      <!-- <EasyDataTable v-if="loading" :rows-per-page=10 :rows-items=[10,25,50,100] :headers="headers" :items="items"
        alternating /> -->

      <div style="display: flex;">
        <p class="text-left mt-2 mb-2">
          <span class="text-subtitle-2">Total Information(s) : </span
          ><v-chip size="small">{{ serverItemsLength }}</v-chip>
        </p>
        <v-spacer></v-spacer>
        <v-btn prepend-icon="mdi-file-excel-outline" size="small" variant="outlined" color="success" @click="exportExcel">
          CSV Export
        </v-btn>
      </div>
      <EasyDataTable
        style="white-space: nowrap"
        :rows-items="[10, 25, 50, 100]"
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="serveSideloading"
        :headers="headers"
        :items="items"
        buttons-pagination
        theme-color="#8DC73F"
      >
      <template #item-device_name="item"><strong>{{item.device_name}}</strong></template>
      <template #item-alarm_status="item">
        <v-chip v-if="item.alarm_status.trim() == 'Create Alarm'" size="small" color="error">{{item.alarm_status}}</v-chip>
        <v-chip v-if="item.alarm_status.trim() == 'Clear Alarm'" size="small" color="success">{{item.alarm_status}}</v-chip>
      </template>
      
      </EasyDataTable>
    </v-col>
  </v-row>
</template>

<script>
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import AlarmLogApi from "../../services/AlarmLogApi";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";
import Chart from "chart.js";
//Chart.register(...registerables);
let myChart = null;
export default {
  components: {
    EasyDataTable,
    Datepicker,
  },
  // setup() {
  //   let date = ref();

  //   let presetRanges = ref([
  //     { label: 'Today', range: [new Date(), new Date()] },
  //     { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
  //     {
  //       label: 'Last month',
  //       range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  //     },
  //     { label: 'Last 3 month', range: [startOfMonth(subMonths(new Date(), 3)), endOfMonth(new Date())] },
  //   ]);

  //   return {
  //     date,
  //     presetRanges,
  //   }
  // },
  data() {
    return {
      keyword: "",
      isDisable: true,
      loading: false,
      date: [new Date(new Date().setHours(0, 0, 0, 0)), new Date()],
      presetRanges: [
        {
          label: "Today",
          range: [new Date(new Date().setHours(0, 0, 0, 0)), new Date()],
        },
        {
          label: "This month",
          range: [startOfMonth(new Date()), endOfMonth(new Date())],
        },
        {
          label: "Last month",
          range: [
            startOfMonth(subMonths(new Date(), 1)),
            endOfMonth(subMonths(new Date(), 1)),
          ],
        },
        {
          label: "Last 3 month",
          range: [
            startOfMonth(subMonths(new Date(), 3)),
            endOfMonth(new Date()),
          ],
        },
      ],
      headers: [
        { text: "Event Id", value: "event_id", sortable: true },
        { text: "Device Type", value: "device_type", sortable: true },
        { text: "None Mobile", value: "none_mobile", sortable: true },
        { text: "Device Name", value: "device_name", sortable: true },
        { text: "Customer Site Code", value: "addr" },
        { text: "Project", value: "project" },
        { text: "Alarm Message", value: "alarm_msg" },
        { text: "Alarm Status", value: "alarm_status" },
        { text: "Timestamp", value: "timestamp" },
      ],
      items: [],
      selSearch: [
        { txt: "All", val: "all" },
        { txt: "DeviceType", val: "a.device_type" },
        { txt: "NoneMobile", val: "a.none_mobile" },
        { txt: "DeviceName", val: "a.device_name" },
        { txt: "Customer Site Code", val: "b.str_v" },
      ],
      selected: { txt: "All", val: "all" },
      typefilter: {
        abox: true,
        wbox: true,
        vabox: true,
        rbox: true,
        thbox: true,
      },
      serveSideloading: true,
      serverOptions: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "id",
        sortType: "desc",
      },
      serverItemsLength: 0,
    };
  },
  methods: {
    resetEvent(){
      this.typefilter = {
        abox: true,
        wbox: true,
        vabox: true,
        rbox: true,
        thbox: true,
      };
      this.selected = { txt: "All", val: "all" };
      this.keyword = "";
      this.date = [new Date(new Date().setHours(0, 0, 0, 0)), new Date()];
      this.submitSearch();
    },
    createChart(){
      let data = {
        labels: ['A-Box', 'W-Box', 'VA-Box', 'R-Box', 'TH-Box'],
        datasets: [
          {
            label: 'A-box',
            data: [0, 0, 0],
            backgroundColor: "#FF6633",
          },
          {
            label: 'R-Box',
            data: [0, 0, 0],
            backgroundColor: "#FF33FF",
          },
        ]
      };

      let config = {
        type: "bar",
        data: data,
        options: {
          plugins: {
            title: {
              display: false,
              text: "Chart.js Bar Chart - Stacked",
            },
            legend: {
              position: "bottom",
              align: "center",
            },
          },
          responsive: true,

          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              //type: 'logarithmic'
            },
          },
        },
      };

      let _ctxx = document.getElementById("myChart");
      let chartStatusxx = new Chart(_ctxx);
      if (chartStatusxx != undefined) {
        chartStatusxx.destroy();
      }

      myChart = new Chart(document.getElementById("myChart"), config);
      document.getElementById("myChart").style.display = "none";

    },
    updateChart(currentLabels, currentDatasets){
      myChart.config.data.datasets = currentDatasets;
      myChart.config.data.labels = currentLabels;
      myChart.update();
      document.getElementById("myChart").style.display = "";
    },
    toStrCsv(items) {
      let str = "";
      items.forEach((ele) => {
        let _line = "";
        _line += ele.addr + ",";
        _line += ele.alarm_msg + ",";
        _line += ele.alarm_status + ",";
        _line += ele.device_name.replace(/,/g, "") + ",";
        _line += ele.device_type + ",";
        _line += ele.event_id + ",";
        _line += ele.imei + ",";
        _line += ele.none_mobile + ",";
        _line += ele.project + ",";
        _line += ele.timestamp;

        str += _line + "\r\n";
      });

      return str;
    },
    exportCSVFile(headers, items, fileTitle) {
      if (headers) {
        items.unshift(headers);
      }

      // Convert Object to JSON
      // var jsonObject = JSON.stringify(items);

      // var csv = this.convertToCSV(jsonObject);
      let csv = this.toStrCsv(items);

      var exportedFilenmae = fileTitle + ".csv" || "export.csv";

      var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    exportExcel() {
      let s_date = this.date[0].toISOString();
      let e_date = this.date[1].toISOString();

      let _abox = this.typefilter.abox ? "1" : "0";
      let _wbox = this.typefilter.wbox ? "1" : "0";
      let _vabox = this.typefilter.vabox ? "1" : "0";
      let _rbox = this.typefilter.rbox ? "1" : "0";
      let _thbox = this.typefilter.thbox ? "1" : "0";

      let typeCode = "" + _abox + _wbox + _vabox + _rbox + _thbox;

      AlarmLogApi.PhpFmAlarmLogList(
        1,
        this.serverItemsLength,
        this.serverOptions.sortBy,
        this.serverOptions.sortType,
        s_date,
        e_date,
        typeCode,
        this.selected.val,
        this.keyword
      )
        .then((response) => {
          let _csv_headers = {
            addr: "Customer Site Code",
            alarm_msg: "Alarm Message",
            alarm_status: "Alarm Status",
            device_name: "Device Name",
            device_type: "Device Type",
            event_id: "Event Id",
            imei: "IMEI",
            none_mobile: "None-Mobile",
            project: "Project",
            timestamp: "Timestamp",
          };
          this.exportCSVFile(
            _csv_headers,
            response.data,
            "FM-log-export.csv"
          );
        })
        .catch((err) => {
          console.log(err);
          let e = err.response.data;
          if (e.status == 401 && e.errorCode == 11) {
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: e.message,
            });
            this.$router.push("/login");
          }
        });
    },
    submitSearch() {
      this.loadInfo();
    },
    loadInfo() {
      // Filter
      let s_date = this.date[0].toISOString();
      let e_date = this.date[1].toISOString();

      let _abox = this.typefilter.abox ? "1" : "0";
      let _wbox = this.typefilter.wbox ? "1" : "0";
      let _vabox = this.typefilter.vabox ? "1" : "0";
      let _rbox = this.typefilter.rbox ? "1" : "0";
      let _thbox = this.typefilter.thbox ? "1" : "0";

      let typeCode = "" + _abox + _wbox + _vabox + _rbox + _thbox;

      // Chart
      AlarmLogApi.PhpStackedBarChartFmInfo(s_date, e_date, typeCode, this.selected.val,this.keyword)
        .then((response) => {
          this.drawBarChart(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      // Table
      this.serveSideloading = true;
      //console.log(this.serverOptions.page);

      //console.log(typeCode);
      AlarmLogApi.PhpFmAlarmLogList(
        this.serverOptions.page,
        this.serverOptions.rowsPerPage,
        this.serverOptions.sortBy,
        this.serverOptions.sortType,
        s_date,
        e_date,
        typeCode,
        this.selected.val,
        this.keyword
      )
        .then((response) => {
          this.serverItemsLength = response.cnt_all_rows;
          this.items = response.data;
          this.serveSideloading = false;
        })
        .catch((err) => {
          console.log(err);
          let e = err.response.data;
          if (e.status == 401 && e.errorCode == 11) {
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: e.message,
            });
            this.$router.push("/login");
          }
        });
    },
    drawBarChart(chartInfo) {
      var colors = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
        "#FF1A66",
        "#E6331A",
        "#33FFCC",
        "#66994D",
        "#B366CC",
        "#4D8000",
        "#B33300",
        "#CC80CC",
        "#66664D",
        "#991AFF",
        "#E666FF",
        "#4DB3FF",
        "#1AB399",
        "#E666B3",
        "#33991A",
        "#CC9999",
        "#B3B31A",
        "#00E680",
        "#4D8066",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#9900B3",
        "#E64D66",
        "#4DB380",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF",
      ];

      Array.prototype.getRandom = function (cut) {
        var i = Math.floor(Math.random() * this.length);
        if (cut && i in this) {
          return this.splice(i, 1)[0];
        }
        return this[i];
      };

      let _alarmData = Array();
      let _selColor = 0;
      console.log(chartInfo);
      let x_info = [];
      chartInfo.forEach((i) => {
        if (i.project) {
          if (x_info.findIndex((_c) => _c === i.project) === -1) {
            x_info.push(i.project);
          }
        }
      });
      chartInfo.forEach((ele, index) => {
        var re = {};
        re.label = ele.alarm_msg;

        re.data = [];
        // re[ele.alarm_msg] = [];
        // re[ele.alarm_msg][0] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'A-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'A-Box')[0].alarm_status);
        // re[ele.alarm_msg][1] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'W-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'W-Box')[0].alarm_status);
        // re[ele.alarm_msg][2] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'VA-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'VA-Box')[0].alarm_status);
        // re[ele.alarm_msg][3] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'R-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'R-Box')[0].alarm_status);
        // re[ele.alarm_msg][4] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'TH-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'TH-Box')[0].alarm_status);

        x_info.forEach((_e, _ix) => {
          re.data[_ix] =
            chartInfo.filter(
              (x) => x.alarm_msg == ele.alarm_msg && x.project == _e
            )[0] === undefined
              ? 0
              : parseInt(
                  chartInfo.filter(
                    (x) => x.alarm_msg == ele.alarm_msg && x.project == _e
                  )[0].alarm_status
                );
        });

        // re.data[0] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'A-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'A-Box')[0].alarm_status);
        // re.data[1] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'W-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'W-Box')[0].alarm_status);
        // re.data[2] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'VA-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'VA-Box')[0].alarm_status);
        // re.data[3] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'R-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'R-Box')[0].alarm_status);
        // re.data[4] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'TH-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'TH-Box')[0].alarm_status);

        if (_alarmData.findIndex((f) => f.label === re.label) === -1) {
          if(re.label == "AC Line Down"){
            re.backgroundColor = "#36a2eb";
          }else if(re.label == "Dead"){
            re.backgroundColor = "rgb(255, 99, 132)";
          }else if(re.label == "Relay Off"){
            re.backgroundColor = "rgb(255, 159, 64)";
          }else{
            re.backgroundColor = colors.getRandom();
          }

          _alarmData.push(re);
          _selColor++;
        }
        //_alarmData.push(re)
        //console.log(index);
      });
      //console.log(_alarmData);

      // UpdateChart
      this.updateChart(x_info, _alarmData);

      // let data = {
      //   //labels: ['A-Box', 'W-Box', 'VA-Box', 'R-Box', 'TH-Box'],
      //   labels: x_info,
      //   datasets: _alarmData,
      //   // datasets: [
      //   //   {
      //   //     label: 'A-box',
      //   //     data: [65, 59, 80],
      //   //     backgroundColor: colors.getRandom(),
      //   //   },
      //   //   {
      //   //     label: 'R-Box',
      //   //     data: [50, 39, 40],
      //   //     backgroundColor: colors.getRandom(),
      //   //   },
      //   // ]
      // };

      // let config = {
      //   type: "bar",
      //   data: data,
      //   options: {
      //     plugins: {
      //       title: {
      //         display: false,
      //         text: "Chart.js Bar Chart - Stacked",
      //       },
      //       legend: {
      //         position: "bottom",
      //         align: "center",
      //       },
      //     },
      //     responsive: true,

      //     scales: {
      //       x: {
      //         stacked: true,
      //       },
      //       y: {
      //         stacked: true,
      //         //type: 'logarithmic'
      //       },
      //     },
      //   },
      // };

      // // let chartStatus = Chart.getChart("myChart"); // <canvas> id
      // // if (chartStatus != undefined) {
      // //   chartStatus.destroy();
      // // }
      // let myChart = new Chart(document.getElementById("myChart"), config);
    },
  },
  watch: {
    serverOptions(val) {
      this.loadInfo();
    },
  },
  mounted() {
    // CreateChart
    this.createChart();
    this.loadInfo();
  },
};
</script>
