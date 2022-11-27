<template>
  <v-card class="mb-2" title="Device Alarm Logs" subtitle="Fillter">
    <v-container>
      <v-row no-gutters>
        <v-col cols="2" class="pa-2">
          <v-select v-model="selected" :items="selSearch" item-title="txt" item-value="val" label="Select"
            persistent-hint return-object single-line></v-select>
        </v-col>
        <v-col cols="6" class="pa-2">
          <v-text-field v-model="name" :counter="255" :rules="nameRules" label="Search text" required></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2">&nbsp;</v-col>
        <v-col cols="6" class="pa-2">
          <Datepicker v-model="date" range :presetRanges="presetRanges" placeholder="Select Date">
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
              <v-checkbox v-model="typefilter.abox" label="A-Box" hide-details></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox v-model="typefilter.wbox" label="W-Box" hide-details></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox v-model="typefilter.vabox" label="VA-Box" hide-details></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox v-model="typefilter.rbox" label="R-Box" hide-details></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox v-model="typefilter.thbox" label="TH-Box" hide-details></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2">&nbsp;</v-col>
        <v-col cols="6" class="pa-2">
          <v-btn @click="submitSearch" color="success" :disabled=false>
            submit
          </v-btn>
          <v-btn class="ml-4" @click="resetEvent">
            Clear
          </v-btn>
        </v-col>
      </v-row>

    </v-container>

  </v-card>
  <div class="d-flex justify-center">
    <img v-if=false src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
      style="width: 200px; height: 150px;" />
  </div>

  <v-row no-gutters>
    <v-col cols="12">
      <canvas class="ma-12" id="myChart"></canvas>
    </v-col>
    <v-col cols="12" class="pa-2">
      <!-- <EasyDataTable v-if="loading" :rows-per-page=10 :rows-items=[10,25,50,100] :headers="headers" :items="items"
        alternating /> -->
      <EasyDataTable style="white-space: nowrap;" :rows-items=[10,25,50,100] v-model:server-options="serverOptions" :server-items-length="serverItemsLength" :loading="serveSideloading" :headers="headers" :items="items"
      buttons-pagination />
    </v-col>
    
  </v-row>



</template>

<script>
import EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import AlarmLogApi from '../../services/AlarmLogApi'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns';
import Chart from 'chart.js/auto';
//Chart.register(...registerables);
export default {
  components: {
    EasyDataTable,
    Datepicker
  },
  // setup() {
  //   const date = ref();

  //   const presetRanges = ref([
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
      isDisable: true,
      loading: false,
      date: [new Date(new Date().setHours(0,0,0,0)), new Date()],
      presetRanges: [
        { label: 'Today', range: [new Date(new Date().setHours(0,0,0,0)), new Date()] },
        { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
        {
          label: 'Last month', range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
        },
        { label: 'Last 3 month', range: [startOfMonth(subMonths(new Date(), 3)), endOfMonth(new Date())] }
      ],
      headers: [
        { text: "Event Id", value: "id", sortable: true },
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
        { txt: 'All', val: 'all' },
        { txt: 'DeviceType', val: 'device_type' },
        { txt: 'NoneMobile', val: 'none_mobile' },
        { txt: 'DeviceName', val: 'device_name' },
        { txt: 'Customer Site Code', val: 'addr' },
      ],
      selected: { txt: 'All', val: 'all' },
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
        sortBy: 'id',
        sortType: 'desc',
      },
      serverItemsLength: 0,
    }
  },
  methods: {
    submitSearch(){
      this.loadInfo();
    },
    loadInfo(){
      // Filter
      let s_date = this.date[0].toISOString();
      let e_date = this.date[1].toISOString();

      let _abox =  this.typefilter.abox ? "1" : "0";
      let _wbox = this.typefilter.wbox ? "1" : "0";
      let _vabox = this.typefilter.vabox ? "1" : "0";
      let _rbox = this.typefilter.rbox ? "1" : "0";
      let _thbox = this.typefilter.thbox ? "1" : "0";

      let typeCode = '' + _abox + _wbox + _vabox + _rbox + _thbox;

      // Chart
      AlarmLogApi.PhpStackedBarChartInfo(s_date, e_date, typeCode)
        .then(response => {
          this.drawBarChart(response.data);
        })
        .catch(err => {
          console.log(err);
        });

      // Table
      this.serveSideloading = true;
      //console.log(this.serverOptions.page);
      
      //console.log(typeCode);
      AlarmLogApi.PhpDeviceAlarmLogListV2(this.serverOptions.page, 
                                          this.serverOptions.rowsPerPage, 
                                          this.serverOptions.sortBy, 
                                          this.serverOptions.sortType,
                                          s_date,
                                          e_date,
                                          typeCode)
        .then(response => {
          this.serverItemsLength = response.cnt_all_rows;
          this.items = response.data;
          this.serveSideloading = false;
        })
        .catch(err => {
          console.log(err);
          const e = err.response.data;
          if ((e.status == 401) && (e.errorCode == 11)) {
            this.$swal.fire({
              icon: 'error',
              title: 'Error',
              text: e.message
            })
            this.$router.push('/login');
          }
      });
    },
    drawBarChart(chartInfo) {
      var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

      Array.prototype.getRandom = function (cut) {
        var i = Math.floor(Math.random() * this.length);
        if (cut && i in this) {
          return this.splice(i, 1)[0];
        }
        return this[i];
      }

      let _alarmData = Array();
      let _selColor = 0;
      console.log(chartInfo);
      let x_info = [];
      chartInfo.forEach( (i)=> {
        if(i.project){
          if(x_info.findIndex(_c => _c === i.project) === -1){
            x_info.push(i.project);
          }
        }
      });
      chartInfo.forEach((ele,index) => {
        var re = {};
        re.label = ele.alarm_msg;
        
        re.data = []
        // re[ele.alarm_msg] = [];
        // re[ele.alarm_msg][0] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'A-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'A-Box')[0].alarm_status);
        // re[ele.alarm_msg][1] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'W-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'W-Box')[0].alarm_status);
        // re[ele.alarm_msg][2] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'VA-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'VA-Box')[0].alarm_status);
        // re[ele.alarm_msg][3] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'R-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'R-Box')[0].alarm_status);
        // re[ele.alarm_msg][4] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'TH-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'TH-Box')[0].alarm_status);
        
        x_info.forEach((_e, _ix) => {
          re.data[_ix] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.project == _e)[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.project == _e)[0].alarm_status);
        });

        // re.data[0] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'A-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'A-Box')[0].alarm_status);
        // re.data[1] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'W-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'W-Box')[0].alarm_status);
        // re.data[2] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'VA-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'VA-Box')[0].alarm_status);
        // re.data[3] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'R-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'R-Box')[0].alarm_status);
        // re.data[4] = chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'TH-Box')[0] === undefined ? 0 : parseInt(chartInfo.filter((x) => x.alarm_msg == ele.alarm_msg && x.device_type == 'TH-Box')[0].alarm_status);
        
        if(_alarmData.findIndex(f => f.label === re.label) === -1){
          re.backgroundColor = colors.getRandom();
          _alarmData.push(re)
          _selColor++;
        };
        //_alarmData.push(re)
        //console.log(index);
      });
      console.log(_alarmData);

      const data = {
        //labels: ['A-Box', 'W-Box', 'VA-Box', 'R-Box', 'TH-Box'],
        labels: x_info,
        datasets: _alarmData
        // datasets: [
        //   {
        //     label: 'A-box',
        //     data: [65, 59, 80],
        //     backgroundColor: colors.getRandom(),
        //   },
        //   {
        //     label: 'R-Box',
        //     data: [50, 39, 40],
        //     backgroundColor: colors.getRandom(),
        //   },
        // ]
      };

      const config = {
        type: 'bar',
        data: data,
        options: {
          
          plugins: {
            title: {
              display: false,
              text: 'Chart.js Bar Chart - Stacked'
            },
            legend: {
              position: 'bottom',
              align: 'center'
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
            }
          }
        }
      };

      let chartStatus = Chart.getChart("myChart"); // <canvas> id
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
      const myChart = new Chart(document.getElementById('myChart'), config);
    }
  },
  watch: {
    serverOptions(val){
      this.loadInfo();
    }
  },
  mounted() {
    this.loadInfo();
  }
}
</script>
