<template>
  <v-card width="inherit" class="mx-auto">
    <v-toolbar
      color="grey darken-4"
      style="background-color: rgb(72, 73, 71) !important"
    >
      <v-toolbar-title
        ><h6 class="text-h6" style="color: white">
          <v-icon color="white" size="small"> mdi-plus </v-icon> Add / Import
          Devices
        </h6></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text
      style="
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        padding: 0px;
      "
      overflow-y="scorll"
    >
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="infoTabs">Information</v-tab>
        <v-tab value="confTabs">Configuration</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="infoTabs">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="pl-12 pt-12 pr-12">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editModel.info.type"
                    :items="['A-Box', 'W-Box', 'VA-Box', 'TH-Box', 'R-Box']"
                    label="Type*"
                    return-object
                    single-line
                    variant="solo"
                    :rules="[(v) => !!v || 'Type is required']"
                    required
                  >
                  </v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editModel.info.addr"
                    label="Address*"
                    variant="solo"
                    :rules="[(v) => !!v || 'Address is required']"
                    required
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editModel.info.project"
                    :items="projects"
                    item-title="name"
                    item-value="id"
                    label="Project*"
                    return-object
                    single-line
                    variant="solo"
                    :rules="[(v) => !!v || 'Project is required']"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editModel.info.provinde"
                    label="Provinde*"
                    variant="solo"
                    :rules="[(v) => !!v || 'Provinde is required']"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editModel.info.imei"
                    label="IMEI*"
                    variant="solo"
                    :rules="[(v) => !!v || 'IMEI is required']"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="editModel.info.region"
                    label="Region*"
                    :items="['BKK', 'CR', 'ER', 'NR', 'NER']"
                    :rules="[(v) => !!v || 'Region is required']"
                    variant="solo"
                    required
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editModel.info.deviceName"
                    label="Device-Name*"
                    :rules="[(v) => !!v || 'Device-Name is required']"
                    variant="solo"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editModel.info.lat"
                        label="Lat"
                        variant="solo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editModel.info.long"
                        label="Long"
                        variant="solo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editModel.info.nmb"
                    label="None-Mobile*"
                    variant="solo"
                    :rules="[(v) => !!v || 'None-Mobile is required']"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">&nbsp;</v-col>

                <v-col cols="12" sm="6">
                  <v-row>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        v-model="editModel.conf.server"
                        label="Server"
                        variant="solo"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="editModel.conf.port"
                        label="Port"
                        variant="solo"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="mb-5">
                  <v-btn
                    color="success"
                    :disabled="disableEditSave"
                    @click="validate"
                  >
                    Submit
                  </v-btn>
                  <v-btn class="ml-4" @click="reset"> Clear </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-window-item>
        <v-window-item value="confTabs" scrollable>
          <v-form>
            <v-container class="pl-12 pt-12 pr-12">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="editModel.conf.interval"
                    label="Interval Times"
                    :items="['2 min', '5 min', '10 min', '15 min', '30 min']"
                    variant="outlined"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editModel.conf.server"
                    label="Server Destination"
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="editModel.conf.ota"
                    label="OTA Status"
                    :items="['0', '1']"
                    variant="outlined"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editModel.conf.port"
                    label="Port"
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editModel.conf.ota_ver"
                    label="OTA Version"
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-if="editModel.conf.rtm != null"
                    v-model="editModel.conf.rtm"
                    label="RTM"
                    :items="['0', '1']"
                    variant="outlined"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-checkbox
                    class="mb-0"
                    v-model="editModel.info.maintenance"
                    label="Maintanance"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="editModel.conf.action"
                    label="Inventory"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-window-item>
      </v-window>
      <!-- <v-row class="mt-0 pl-12 pr-12 mb-12">
        <v-col cols="12" sm="6">
          <v-btn color="success" :disabled="disableEditSave" @click="validate">
            Submit
          </v-btn>
          <v-btn class="ml-4" @click="reset"> Clear </v-btn>
        </v-col>
      </v-row> -->
    </v-card-text>
  </v-card>
</template>
<script>
import ProjectApi from "../../services/ProjectApi";
export default {
  data() {
    return {
      valid: true,
      tab: null,
      projects: null,
      editModel: {
        device_id: null,
        info: {
          type: null,
          project: null,
          imei: null,
          deviceName: null,
          nmb: null,
          addr: null,
          provinde: null,
          region: null,
          lat: null,
          long: null,
          maintenance: null,
        },
        conf: {
          interval: null,
          server: "182.52.50.211",
          ota: null,
          port: 5683,
          ota_ver: null,
          rtm: null,
        },
      },
    };
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) { this.processAddDevice(); }
    },
    reset() {
      this.$refs.form.reset();
      this.editModel.info.project = this.projects[0];
      this.editModel.conf.server = "182.52.50.211";
      this.editModel.conf.port = 5683;
    },
    processAddDevice(){
      console.log(this.editModel.info)
      // 1 http://182.52.50.211:18080/api/device
      // { "name": "351245142", "type": "R-Box" }
      // --> get id

      // 2 http://182.52.50.211:18080/api/customer/245306e0-15f3-11ec-aa9a-51d72ec5acff/device/b48dd170-779c-11ed-a2c8-b55147006237
      // {custommerid}/device/{deviceid}
      // nopayload

      // 3 http://182.52.50.211:18080/api/device/b48dd170-779c-11ed-a2c8-b55147006237/credentials [GET]
      // {
      //   "id": {
      //     "id": "b48e1f90-779c-11ed-a2c8-b55147006237"
      //   },
      //   "createdTime": 1670575044617,
      //   "deviceId": {
      //     "entityType": "DEVICE",
      //     "id": "b48dd170-779c-11ed-a2c8-b55147006237"
      //   },
      //   "credentialsType": "ACCESS_TOKEN",
      //   "credentialsId": "4lVxdjZvUp65uyqmwdtm", *** Change
      //   "credentialsValue": null
      // }


      // 4 http://182.52.50.211:18080/api/device/credentials [POST]
      // {
      //   "id": {
      //     "id": "b48e1f90-779c-11ed-a2c8-b55147006237"
      //   },
      //   "createdTime": 0,
      //   "deviceId": {
      //     "entityType": "DEVICE",
      //     "id": "b48dd170-779c-11ed-a2c8-b55147006237"
      //   },
      //   "credentialsType": "ACCESS_TOKEN",
      //   "credentialsId": "351245142"
      // }

      // 5 Create Dashboard http://182.52.50.211:18080/api/dashboard [POST]
      
      // 6 Add Dashboard to Custommer http://182.52.50.211:18080/api/dashboard/b49ceca0-779c-11ed-a2c8-b55147006237/customers [POST] {deviceid}
      // Payload ["245306e0-15f3-11ec-aa9a-51d72ec5acff"] {custommerid}

      // 7 Set Server Scope http://182.52.50.211:18080/api/plugins/telemetry/DEVICE/b48dd170-779c-11ed-a2c8-b55147006237/SERVER_SCOPE [POST]
      // {
      //   "imsi": "",
      //   "none-mobile": "1111111",
      //   "device-name": "1111",
      //   "addr": "1111",
      //   "provinde": "1111",
      //   "region": "CR",
      //   "lat": "",
      //   "dashboard-url": "http://182.52.50.211:18080/dashboards/b49ceca0-779c-11ed-a2c8-b55147006237?publicId=245306e0-15f3-11ec-aa9a-51d72ec5acff",
      //   "maintenance": false,
      //   "deploy": 1,
      //   "ac_abox_enable": 1,
      //   "ac_wbox_enable": 1,
      //   "ac_thbox_enable": 1,
      //   "ac_vabox_enable": 1,
      //   "ac_rbox_enable": 1,
      //   "opt_enable": 1,
      //   "cur_zero_enable": 1,
      //   "temp_enable": 1,
      //   "hum_enable": 1,
      //   "volt_enable": 1,
      //   "cur_enable": 1,
      //   "eny_enable": 1,
      //   "pow_enable": 1,
      //   "relay_enable": 1,
      //   "long": ""
      // }

      // 8 Set Shared Scope http://182.52.50.211:18080/api/plugins/telemetry/DEVICE/b48dd170-779c-11ed-a2c8-b55147006237/SHARED_SCOPE
      // {
      //   "ota": "0",
      //   "ota_ver": "1",
      //   "interval": "120",
      //   "rtm": 0,
      //   "sw": 1,
      //   "port": "5683",
      //   "server": "182.52.50.211"
      // }

    },
    initPage() {
      ProjectApi.PhpProjectList()
        .then((response) => {
          this.projects = response.data.filter(
            (x) => x.name != "REUSE" && x.name != "UNLIST"
          );

          this.editModel.info.project = this.projects[0];

          console.log(this.projects);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.initPage();
  },
};
</script>
