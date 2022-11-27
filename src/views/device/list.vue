<template class="pa-5">
  <v-row no-gutters>
    <v-col cols="4">
      <canvas class="ma-12" id="statusChart"></canvas>
    </v-col>
    <v-col cols="8" class="pa-2">
      <v-container>
        <v-row no-gutters>
          <v-col cols="4" class="pa-2">
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
          <v-col cols="8" class="pa-2">
            <v-text-field
              v-model="name"
              :counter="255"
              :rules="nameRules"
              label="Search text"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4">&nbsp;</v-col>
          <v-col cols="8" class="pa-2">
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
          <v-col cols="4">&nbsp;</v-col>
          <v-col cols="8" class="pa-2">
            <v-row no-gutters>
              <v-col cols="4">
                <v-checkbox
                  v-model="typefilter.abox"
                  label="Online"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="typefilter.wbox"
                  label="Offline"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="typefilter.vabox"
                  label="Dead"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="typefilter.rbox"
                  label="New"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="typefilter.thbox"
                  label="Maintanance"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4">&nbsp;</v-col>
          <v-col cols="8" class="pa-2">
            <v-btn @click="submitSearch" color="success" :disabled="false">
              submit
            </v-btn>
            <v-btn class="ml-4" @click="resetEvent"> Clear </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
  <p class="text-left mt-2 mb-2">
    <span class="text-subtitle-2">Debugs : </span
    ><v-chip size="small">{{ projectId }}</v-chip>
  </p>
  <p class="text-left mt-2 mb-2">
    <span class="text-subtitle-2">Total Device(s) : </span
    ><v-chip size="small">{{ serverItemsLength }}</v-chip>
  </p>
  <EasyDataTable
    :rows-items="[10, 25, 50, 100]"
    v-model:server-options="serverOptions"
    :server-items-length="serverItemsLength"
    :loading="serveSideloading"
    :headers="headers"
    :items="items"
    buttons-pagination
  >
    <template #item-statusCode="item">
      <v-chip
        v-if="item.statusCode == 1"
        size="small"
        class="ma-2"
        color="success"
        label
        variant="outlined"
        >Online</v-chip
      >
      <v-chip
        v-if="item.statusCode == 2"
        size="small"
        class="ma-2"
        color="warning"
        label
        variant="outlined"
        >Offline</v-chip
      >
      <v-chip
        v-if="item.statusCode == 3"
        size="small"
        class="ma-2"
        color="error"
        label
        variant="outlined"
        >Dead</v-chip
      >
      <v-chip
        v-if="item.statusCode == 4"
        size="small"
        class="ma-2"
        label
        variant="outlined"
        >Maintanance</v-chip
      >
    </template>
    <template #item-sensor="item">
      <template v-if="item.ac == '1'">
        <v-icon icon="mdi-flash" color="success"></v-icon>
      </template>
      <template v-else>
        <v-icon icon="mdi-flash-off" color="error"></v-icon>
      </template>
      <template v-if="item.type == 'R-Box'">
        <template v-if="item.relay == '1'">
          <v-icon icon="mdi-lightbulb-outline" color="success"></v-icon>
        </template>
        <template v-else>
          <v-icon icon="mdi-lightbulb-off" color="error"></v-icon>
        </template>
      </template>
    </template>
    <template #item-type="item">
      <v-chip size="small" class="ma-2" variant="outlined" label>{{
        item.type
      }}</v-chip>
    </template>
    <template #item-action="item">
      <v-btn-toggle rounded="x2">
        <v-btn
          size="small"
          icon="mdi-view-dashboard"
          @click="viewDashboard(item)"
        ></v-btn>
        <v-btn size="small" icon="mdi-pencil" @click="editInfo(item)"></v-btn>
        <v-btn
          size="small"
          icon="mdi-trash-can"
          @click="delBtnClick(item)"
        ></v-btn>
        <v-btn
          size="small"
          icon="mdi-arrow-right-bold-circle-outline"
          @click="moveBtnClick(item)"
        ></v-btn>
      </v-btn-toggle>
    </template>
  </EasyDataTable>
  <GDialog max-width="1200" height="inherit" v-model="dialogState" scrollable>
    <v-card width="inherit" class="mx-auto">
      <v-toolbar
        color="grey darken-4"
        style="background-color: rgb(72, 73, 71) !important"
      >
        <v-toolbar-title
          ><h6 class="text-h6" style="color: white">
            <v-icon color="white" size="small"> mdi-view-dashboard </v-icon>
            Device Dashboard
          </h6></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn style="color: white" icon @click="dialogState = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text
        style="
          width: -webkit-fill-available;
          height: -webkit-fill-available;
          padding: 0px;
        "
      >
        <iframe
          style="width: -webkit-fill-available; height: -webkit-fill-available"
          frameborder="0"
          :src="currentDashboard"
        ></iframe>
      </v-card-text>
    </v-card>
  </GDialog>

  <GDialog max-width="1200" v-model="editDialogState" scrollable>
    <v-card width="inherit" class="mx-auto">
      <v-toolbar
        color="grey darken-4"
        style="background-color: rgb(72, 73, 71) !important"
      >
        <v-toolbar-title
          ><h6 class="text-h6" style="color: white">
            <v-icon color="white" size="small"> mdi-pencil </v-icon> Edit
            Devices
          </h6></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn style="color: white" icon @click="editDialogState = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text
        style="
          width: -webkit-fill-available;
          height: -webkit-fill-available;
          padding: 0px;
        "
      >
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="infoTabs">Information</v-tab>
          <v-tab value="confTabs">Configuration</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="infoTabs">
            <v-form>
              <v-container class="pa-12">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editModel.info.type"
                      label="Type*"
                      variant="solo"
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editModel.info.addr"
                      label="Address*"
                      variant="solo"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editModel.info.project"
                      label="Project*"
                      variant="solo"
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editModel.info.provinde"
                      label="Provinde*"
                      variant="solo"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editModel.info.imei"
                      label="IMEI*"
                      variant="solo"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="editModel.info.region"
                      label="Region*"
                      :items="['BKK', 'CR', 'ER', 'NR', 'NER']"
                      variant="solo"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editModel.info.deviceName"
                      label="Device-Name*"
                      variant="solo"
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
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-btn color="success"> submit </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-window-item>
          <v-window-item value="confTabs">
            <v-form>
              <v-container class="pa-12">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="editModel.conf.interval"
                      label="Interval Times"
                      :items='["2 min", "5 min", "10 min", "15 min", "30 min"]'
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
                      v-model="editModel.conf.rtm"
                      label="RTM"
                      :items="['0', '1']"
                      variant="outlined"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-checkbox
                      class="mb-0"
                      v-model="editModel.conf.action"
                      label="Maintanance"
                      value="1"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="editModel.conf.action"
                      label="Inventory"
                      value="2"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-btn color="success"> submit </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </GDialog>
</template>

<script>
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import ReuseApi from "../../services/ReuseApi";
import ProjectApi from "../../services/ProjectApi";
import DeviceMgmtApi from "../../services/DeviceMgmtApi";
import LoginApi from "../../services/LoginApi";
import { GDialog } from "gitart-vue-dialog";
import { mapState, mapGetters } from "vuex";
import Chart from "chart.js/auto";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    EasyDataTable,
    GDialog,
    Datepicker,
  },
  computed: {
    projectId() {
      return this.$store.state.project.projectId;
    },
  },
  watch: {
    projectId(newvalue, oldvalue) {
      this.loadInfo(newvalue);
    },
    $route(to, from) {
      this.loadInfo(this.projectId);
    },
  },
  created() {
    var scripts = [
      "https://cdn.jsdelivr.net/npm/chartjs-plugin-piechart-outlabels",
    ];
    scripts.forEach((script) => {
      let tag = document.createElement("script");
      tag.setAttribute("src", script);
      document.head.appendChild(tag);
    });
  },
  data() {
    return {
      current_project_txt: "",
      tab: null,
      pageType: "",
      searchMoveField: ["name"],
      searchMovePj: "",
      sel_device_from: "",
      sel_project_unlist_dest: "",
      sel_project_reuse_dest: "",
      dialogState: false,
      editDialogState: false,
      headers: [
        { text: "Status", value: "statusCode" },
        { text: "Sensor Status", value: "sensor" },
        { text: "Type", value: "type" },
        { text: "Device Name", value: "device_name" },
        { text: "IMSI", value: "imsi" },
        { text: "Non Mobile", value: "none_mobile" },
        { text: "Customer Site Code", value: "addr" },
        { text: "Region", value: "region" },
        { text: "Last Update", value: "last_update" },
        { text: "Action", value: "action" },
      ],
      items: [],
      serveSideloading: true,
      serverOptions: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "id",
        sortType: "desc",
      },
      serverItemsLength: 0,
      headers_move: [
        { text: "", value: "id" },
        { text: "Project Name", value: "name" },
      ],
      items_move: [],
      currentDashboard: "",
      typefilter: {
        abox: true,
        wbox: true,
        vabox: true,
        rbox: true,
        thbox: true,
      },
      chartStatus: {
        online: 0,
        offline: 0,
        dead: 0,
        maintanance: 0,
      },
      intervelEdit: [
        { text: "2 min", value: 120 },
        { text: "5 min", value: 300 },
        { text: "10 min", value: 600 },
        { text: "15 min", value: 900 },
        { text: "30 min", value: 1800 },
      ],
      editModel: {
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
        },
        conf: {
          interval: null,
          server: null,
          ota: null,
          port: null,
          ota_ver: null,
          rtm: null,
        },
      },
    };
  },

  methods: {
    editInfo(item) {
      // Info
      this.editModel.info.type = item.type;
      this.editModel.info.project = this.current_project_txt;
      this.editModel.info.addr = item.addr;
      this.editModel.info.provinde = item.provinde;
      this.editModel.info.imei = item.imei;
      this.editModel.info.region = item.region;
      this.editModel.info.deviceName = item.device_name;
      this.editModel.info.nmb = item.none_mobile;

      DeviceMgmtApi.GetServerScope(item.device_id)
        .then((_res) => {
          this.editModel.info.lat = _res.filter((x) => x.key == "lat")[0].value;
          this.editModel.info.long = _res.filter(
            (x) => x.key == "long"
          )[0].value;
          DeviceMgmtApi.GetSharedScope(item.device_id)
            .then((__res) => {
              // Conf
              let tmp_interval = __res.filter(
                (x) => x.key == "interval"
              )[0].value;

              this.editModel.conf.interval = this.intervelEdit.filter(y => y.value == tmp_interval)[0].text;

              console.log(this.editModel.conf.interval);

              this.editModel.conf.server = __res.filter(
                (x) => x.key == "server"
              )[0].value;
              this.editModel.conf.ota = __res.filter(
                (x) => x.key == "ota"
              )[0].value;
              this.editModel.conf.port = __res.filter(
                (x) => x.key == "port"
              )[0].value;
              this.editModel.conf.ota_ver = __res.filter(
                (x) => x.key == "ota_ver"
              )[0].value;
              this.editModel.conf.rtm = __res.filter(
                (x) => x.key == "rtm"
              )[0].value;
            })
            .catch((__err) => {
              console.log(__err);
              let e = __err.response.data;
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
        })
        .catch((_err) => {
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
      console.log(item);
      this.editDialogState = true;
    },
    viewDashboard(item) {
      this.currentDashboard = item.dashboard_url;
      this.dialogState = true;
    },
    delBtnClick(item) {
      this.sel_device_from = item.device_id;
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want Move Delete This Device ?",
          inputPlaceholder: "Please, Enter Your Current Password",
          icon: "warning",
          input: "password",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Ok",
          showLoaderOnConfirm: true,
          preConfirm: (pass) => {
            return LoginApi.AuthenEDSS({
              username: localStorage.getItem("username"),
              password: pass,
            })
              .then((response) => {
                console.log(response.token);
                if (!response.token) {
                  throw new Error(response.statusText);
                }
                return response;
              })
              .catch((error) => {
                console.log(error);
                this.$swal.showValidationMessage(
                  `${error.response.data.message}`
                );
              });
          },
          allowOutsideClick: () => {
            !this.$swal.isLoading();
            return false;
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Write Info
            let _res = {};
            _res.deploy = 0;
            ReuseApi.SetServerScope(this.sel_device_from, _res).then(
              (res2) => {}
            );

            // Move
            let payload =
              this.sel_project_unlist_dest + "/device/" + this.sel_device_from;
            ProjectApi.MoveDeviceToNewProject(payload)
              .then((response) => {
                this.$swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: "Complete",
                });
                this.loadInfo(this.projectId);
                this.dialogState = false;
              })
              .catch((err) => {
                console.log(err);
                this.$swal.fire({
                  icon: "error",
                  title: "Error!",
                  text: "Something Wrong",
                });
                this.loadInfo(this.projectId);
                this.dialogState = false;
              });
          }
        });
    },
    moveBtnClick(item) {
      this.sel_device_from = item.device_id;
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want Move This Device To Reuse ?",
          inputPlaceholder: "Please, Enter Your Current Password",
          icon: "info",
          input: "password",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Ok",
          showLoaderOnConfirm: true,
          preConfirm: (pass) => {
            return LoginApi.AuthenEDSS({
              username: localStorage.getItem("username"),
              password: pass,
            })
              .then((response) => {
                console.log(response.token);
                if (!response.token) {
                  throw new Error(response.statusText);
                }
                return response;
              })
              .catch((error) => {
                console.log(error);
                this.$swal.showValidationMessage(
                  `${error.response.data.message}`
                );
              });
          },
          allowOutsideClick: () => {
            !this.$swal.isLoading();
            return false;
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Write Info
            let _res = {};
            //_res.date_first_install = "";
            _res.reuse_count = "0";
            _res.date_in_stock = new Date().toLocaleString();

            ReuseApi.GetListScope(this.sel_device_from).then((res1) => {
              console.log(res1);
              let _cnt = res1.filter((x) => x.key == "reuse_count")[0].value;
              _res.reuse_count = _cnt ? (parseInt(_cnt) + 1).toString() : "1";
              ReuseApi.SetServerScope(this.sel_device_from, _res).then(
                (res2) => {}
              );
            });

            // Move
            let payload =
              this.sel_project_reuse_dest + "/device/" + this.sel_device_from;
            ProjectApi.MoveDeviceToNewProject(payload)
              .then((response) => {
                this.$swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: "Complete",
                });
                this.loadInfo(this.projectId);
                this.dialogState = false;
              })
              .catch((err) => {
                console.log(err);
                this.$swal.fire({
                  icon: "error",
                  title: "Error!",
                  text: "Something Wrong",
                });
                this.loadInfo(this.projectId);
                this.dialogState = false;
              });
          }
        });
    },
    loadInfo(newProjectId) {
      let types = "All";
      switch (this.$route.params.types) {
        case "abox":
          types = "A-Box";
          break;
        case "wbox":
          types = "W-Box";
          break;
        case "thbox":
          types = "TH-Box";
          break;
        case "vabox":
          types = "VA-Box";
          break;
        case "rbox":
          types = "R-Box";
          break;
        default:
          types = "All";
      }
      this.pageType = types;

      this.serveSideloading = true;

      // Find Device
      console.log("xxx");
      ProjectApi.GetListScope(newProjectId)
        .then((_res) => {
          let _now = new Date();
          let _offline_period = _res.find((o) => o.key === "offline_period")
            ? _res.find((o) => o.key === "offline_period").value
            : 0;
          let _dead_period = _res.find((o) => o.key === "lost_period")
            ? _res.find((o) => o.key === "lost_period").value
            : 0;
          console.log("offline => " + _offline_period);
          console.log("dead => " + _dead_period);
          this.chartStatus.online = 0;
          this.chartStatus.offline = 0;
          this.chartStatus.dead = 0;
          this.chartStatus.maintanance = 0;

          DeviceMgmtApi.DeviceList(newProjectId, this.pageType)
            .then((response) => {
              if (response.data.length > 0) {
                response.data.forEach((_ele, _ix) => {
                  // To Timestamp

                  let _currentLastUpdate = new Date(parseInt(_ele.last_update));
                  _ele.last_update = new Date(
                    parseInt(_ele.last_update)
                  ).toLocaleString();

                  // Defind Status
                  let _now = new Date();
                  let _currentStatus = 1; // 1 online, 2 offline, 3 dead, 4 maintanance
                  let _offline_border = new Date(
                    _now.setMinutes(_now.getMinutes() - _offline_period)
                  );
                  let _dead_border = new Date(
                    _now.setMinutes(_now.getMinutes() - _dead_period)
                  );

                  console.log(_currentLastUpdate);
                  console.log(_offline_border);
                  console.log(_dead_border);

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

                  // Defind Status
                  _ele.statusCode = _currentStatus;

                  if (_currentStatus == 1) {
                    this.chartStatus.online = this.chartStatus.online + 1;
                  } else if (_currentStatus == 2) {
                    this.chartStatus.offline = this.chartStatus.offline + 1;
                  } else if (_currentStatus == 3) {
                    this.chartStatus.dead = this.chartStatus.dead + 1;
                  } else if (_currentStatus == 4) {
                    this.chartStatus.maintanance =
                      this.chartStatus.maintanance + 1;
                  }
                });

                // Draw Chart
                const dataStatusChart = {
                  labels: ["Dead", "Offline", "Online", "Maintanance"],
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: [
                        this.chartStatus.dead,
                        this.chartStatus.offline,
                        this.chartStatus.online,
                        this.chartStatus.maintanance,
                      ],
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

                let chartStatus = Chart.getChart("statusChart"); // <canvas> id
                if (chartStatus != undefined) {
                  chartStatus.destroy();
                }
                const myChart = new Chart(
                  document.getElementById("statusChart"),
                  {
                    type: "doughnut",
                    data: dataStatusChart,
                    options: {
                      plugins: {
                        legend: { display: false },
                      },
                      aspectRatio: 1.5,
                    },
                  }
                );

                // Store Data To Table
                this.serverItemsLength = response.data.length;
                this.items = response.data;
              } else {
                let chartStatus = Chart.getChart("statusChart"); // <canvas> id
                if (chartStatus != undefined) {
                  chartStatus.destroy();
                }
              }

              this.serveSideloading = false;
            })
            .catch((err) => {
              console.log(err);
              this.items = [];
              this.serverItemsLength = 0;
              this.serveSideloading = false;
            });
        })
        .catch((xxx) => {
          console.log(xxx);
          let e = xxx.response.data;
          console.log(e.status);
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

      ProjectApi.PhpProjectList()
        .then((response) => {
          this.sel_project_reuse_dest = response.data.filter(
            (x) => x.name == "REUSE"
          )[0].id;
          this.sel_project_unlist_dest = response.data.filter(
            (x) => x.name == "UNLIST"
          )[0].id;

          this.current_project_txt = response.data.filter(
            (x) => x.id == this.projectId
          )[0].name;

          this.items_move = response.data.filter((x) => x.name == "REUSE");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    //this.loadInfo(this.projectId);
  },
};
</script>
<style scoped>
.dialog {
  color: #000;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 30px 20px;
  overflow: auto;
}

.actions {
  padding: 10px;
  border-top: 1px solid rgb(179, 179, 179);
}
</style>
