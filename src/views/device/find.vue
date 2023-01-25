<template>
  <v-card>
    <v-toolbar color="rgb(72, 73, 71)" style="color: white" title="Find Device">
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text class="mb-5">
      <v-row class="justify-center align-center">
        <v-col cols="12" sm="4" class="text-right">
          <span class="text-overline"
            >Search Information<span style="color: red">*</span></span
          >
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            hide-details="true"
            v-model="searchTxt"
            label="Device Name, IMEI, IMSI"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" class="text-right"> &nbsp; </v-col>
        <v-col cols="12" sm="6">
          <v-btn
            size="small"
            @click="findDevice()"
            color="success"
            :disabled="disabledVal"
          >
            <span style="color:white;">Submit</span>
          </v-btn>
          <v-btn size="small" class="ml-4" @click="clearSearch()">
            Clear
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-img
    v-if="nodata"
    src="./../../assets/nodata-found.png"
    contain
    height="300px"
  ></v-img>
  <EasyDataTable
    v-if="items.length > 0"
    table-class-name="customize-table"
    class="mt-5 ml-5 mr-5"
    :rows-per-page="5"
    :rows-items="[5, 10, 25, 100]"
    :headers="headers"
    :items="items"
    alternating
    theme-color="#8DC73F"
  >
    <template #item-info="item">
      <v-expansion-panels class="mt-5 mb-5">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-list-item exact-active-class="font-weight-black" two-line>
              <template v-slot:title>
                <h5 class="text-subtitle">{{ item.device_name }}</h5>
              </template>

              <template v-slot:subtitle>
                <p class="text-overline">{{ item.imei }}</p>
              </template>
            </v-list-item>
            <v-spacer></v-spacer>
            <v-btn
              size="small"
              class="mr-8"
              style="color: white"
              color="rgb(72, 73, 71)"
              @click="toProject(item)"
            >
              Go To Project
            </v-btn>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="6">
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Type</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.type"
                      label="Type"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Project</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.pj_name"
                      label="Project-Name"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">IMEI</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.imei"
                      label="IMEI"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">IMSI</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.imsi"
                      label="IMSI"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">DeviceName</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.device_name"
                      label="Device Name"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">None-Mobile</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.none_mobile"
                      label="None-Mobile"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Custommer Site Code</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.addr"
                      label="Custommer Site Code"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Provinde</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.provinde"
                      label="Provinde"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Region</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.region"
                      label="Region"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Latitude</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.lat"
                      label="Latitude"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Longitude</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.long"
                      label="Longitude"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Interval Times</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.intv"
                      label="Interval Times"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">OTA Status</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.ota"
                      label="OTA Status"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">OTA Version</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.ota_ver"
                      label="OTA Version"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Server Destination</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.serv_dest"
                      label="Server Destination"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Port</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.port_dest"
                      label="Port"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Device Status</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-chip
                      v-if="item.statusCode == 1"
                      size="small"
                      class="ma-2"
                      color="success"
                      label
               
                      >Online</v-chip
                    >
                    <v-chip
                      v-if="item.statusCode == 2"
                      size="small"
                      class="ma-2"
                      color="warning"
                      label
             
                      >Offline</v-chip
                    >
                    <v-chip
                      v-if="item.statusCode == 3"
                      size="small"
                      class="ma-2"
                      color="error"
                      label
    
                      >Dead</v-chip
                    >
                    <v-chip
                      v-if="item.statusCode == 4"
                      size="small"
                      class="ma-2"
                      label
    
                      >Maintanance</v-chip
                    >

                    <v-chip
                      v-if="item.statusCode == 5"
                      size="small"
                      class="ma-2"
                      color="#36a2eb"
                      label
   
                      >New</v-chip
                    >
                  </v-col>
                </v-row>

                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Last Update</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      hide-details="true"
                      v-model="item.last_update"
                      label="Last Update"
                      readonly
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </EasyDataTable>
  <div class="text-center">
    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
    >
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <span>Loading</span>
    </div>
    </v-overlay>
  </div>
</template>

<script>
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import DeviceMgmtApi from "../../services/DeviceMgmtApi";
import { mapActions } from "vuex";

export default {
  components: {
    EasyDataTable,
  },
  watch: {
    searchTxt() {
      this.disabledVal = this.searchTxt.length > 0 ? false : true;
    },
  },
  methods: {
    ...mapActions({
      setProjectId: "project/setProjectId",
    }),
    toProject(item) {
      let _goTo = "/device/overview";
      if (item.pj_name == "INVENTORY") {
        _goTo = "/inventory/all";
      } else if (item.pj_name == "UNLIST") {
        _goTo = "/unlist/all";
      } else if (item.pj_name == "REUSE") {
        _goTo = "/reuse/all";
      }
      console.log(item.pj_id);
      this.setProjectId(item.pj_id);
      this.$router.push(_goTo);
    },
    findDevice() {
      this.overlay = true;
      this.nodata = false;
      DeviceMgmtApi.FindDevice(this.searchTxt.toLowerCase())
        .then((response) => {
          if (response.status != 200) {
            this.nodata = true;
            this.items = [];
            this.overlay = false;
          } else {
            response.data.forEach((ele) => {

              // Defind Status
              let _currentLastUpdate = new Date(parseInt(ele.last_update));
              ele.last_update = new Date(
                    parseInt(ele.last_update)
                  ).toLocaleString();
              let _offline_period = parseInt(ele.offline_period);
              let _dead_period = parseInt(ele.lost_period);

              // ele.last_update =
              //   new Date(parseInt(ele.last_update)) == "Invalid Date"
              //     ? ""
              //     : new Date(parseInt(ele.last_update)).toLocaleString();

              ele.last_update =
                _currentLastUpdate == "Invalid Date"
                  ? ""
                  : _currentLastUpdate.toLocaleString();

              let _now = new Date();
              let _currentStatus = 1; // 1 online, 2 offline, 3 dead, 4 maintanance
              let _offline_border = new Date(
                _now.setMinutes(_now.getMinutes() - _offline_period)
              );
              let _dead_border = new Date(
                _now.setMinutes(_now.getMinutes() - _dead_period)
              );

              if (ele.last_update == "Invalid Date") {
                // New
                _currentStatus = 5;
              } else {
                if (ele.maintenance == "true") {
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
              }

              // Defind Status
              ele.statusCode = _currentStatus;
            });

            this.items = response.data;
            this.overlay = false;
          }
        })
        .catch((err) => { this.overlay = false; });
    },
    clearSearch() {
      this.searchTxt = "";
      this.nodata = false;
      this.items = [];
      this.overlay = false;
    },
  },
  data() {
    return {
      overlay: false,
      nodata: false,
      disabledVal: true,
      searchTxt: "",
      headers: [{ text: "", value: "info" }],
      items: [],
    };
  },
};
</script>
<style>
.customize-table {
  --easy-table-border: 0px;
  --easy-table-body-row-hover-background-color: none;
}

.wrapper{
    width:200px;
    height:60px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
.circle{
    width:20px;
    height:20px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    left:15%;
    transform-origin: 50%;
    animation: circle .5s alternate infinite ease;
}

@keyframes circle{
    0%{
        top:60px;
        height:5px;
        border-radius: 50px 50px 25px 25px;
        transform: scaleX(1.7);
    }
    40%{
        height:20px;
        border-radius: 50%;
        transform: scaleX(1);
    }
    100%{
        top:0%;
    }
}
.circle:nth-child(2){
    left:45%;
    animation-delay: .2s;
}
.circle:nth-child(3){
    left:auto;
    right:15%;
    animation-delay: .3s;
}
.shadow{
    width:20px;
    height:4px;
    border-radius: 50%;
    background-color: rgba(0,0,0,.5);
    position: absolute;
    top:62px;
    transform-origin: 50%;
    z-index: -1;
    left:15%;
    filter: blur(1px);
    animation: shadow .5s alternate infinite ease;
}

@keyframes shadow{
    0%{
        transform: scaleX(1.5);
    }
    40%{
        transform: scaleX(1);
        opacity: .7;
    }
    100%{
        transform: scaleX(.2);
        opacity: .4;
    }
}
.shadow:nth-child(4){
    left: 45%;
    animation-delay: .2s
}
.shadow:nth-child(5){
    left:auto;
    right:15%;
    animation-delay: .3s;
}
.wrapper span{
    position: absolute;
    top:75px;
    font-size: 24px;
    letter-spacing: 8px;
    color: #fff;
    left:15%;
}
</style>
