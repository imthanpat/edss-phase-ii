<template>
  <v-card class="mb-4">
    <v-toolbar
      color="grey darken-4"
      style="background-color: rgb(72, 73, 71) !important"
    >
      <v-toolbar-title
        ><h6 class="text-h6" style="color: white">
          Device Inventory Filter
        </h6></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
      <v-row no-gutters class="mb-0">
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
            v-model="searchTxt"
            :counter="255"
            label="Search text"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="mb-0">
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
            <v-col cols="4">
              <v-checkbox
                v-model="typefilter.ready"
                label="Ready To Implement"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="typefilter.new"
                label="New"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="typefilter.maintenance"
                label="Maintanance"
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
            submit
          </v-btn>
          <v-btn class="ml-4" @click="clearSearch"> Clear </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <p class="text-left mt-2 mb-2">
    <span class="text-subtitle-2">Total Device(s) : </span
    ><v-chip size="small">{{ serverItemsLength }}</v-chip>
  </p>
  <EasyDataTable
    style="overflow: hidden; text-overflow: ellipsis"
    :rows-per-page="10"
    :rows-items="[10, 25, 50, 100]"
    :loading="serveSideloading"
    :headers="headers"
    :items="items"
    buttons-pagination
  >
    <template #item-statusCode="item">
      <v-chip
        v-if="item.statusCode == 6"
        size="small"
        class="ma-2"
        color="success"
        label
        >Ready To Implement</v-chip
      >
      <v-chip
        v-if="item.statusCode == 4"
        size="small"
        class="ma-2"
        label
        variant="outlined"
        >Maintanance</v-chip
      >

      <v-chip
        v-if="item.statusCode == 5"
        size="small"
        class="ma-2"
        color="#36a2eb"
        label
        variant="outlined"
        >New</v-chip
      >
    </template>
    <template #item-sensor="item">
      <v-icon icon="mdi-flash"></v-icon>
      <v-icon v-if="item.type == 'R-Box'" icon="mdi-lightbulb"></v-icon>
    </template>
    <template #item-type="item">
      <v-chip size="small" class="ma-2" variant="outlined" label>{{
        item.type
      }}</v-chip>
    </template>
    <template #item-action="item">
      <v-btn-group rounded="x2">
      <v-btn size="small" icon="mdi-pencil" @click="editInfo(item)"></v-btn>
        <v-btn
          size="small"
          icon="mdi-trash-can"
          @click="delBtnClick(item)"
        ></v-btn>
      <v-btn
        class="sm-btn"
        variant="text"
        icon="mdi-arrow-right-bold-circle-outline"
        @click="moveBtnClick(item)"
      ></v-btn>
      </v-btn-group>
    </template>
  </EasyDataTable>
  <GDialog v-model="dialogState" max-width="300" scrollable>
    <div class="dialog" style="width: inherit">
      <v-text-field
        label="Filter Project"
        v-model="searchMovePj"
      ></v-text-field>
      <div class="content">
        <EasyDataTable
          :headers="headers_move"
          :items="items_move"
          :rows-per-page="5"
          :hide-rows-per-page="true"
          :search-field="searchMoveField"
          :search-value="searchMovePj"
        >
          <template #item-id="item">
            <v-checkbox
              v-model="sel_project_dest"
              :value="item.id"
              hide-details
            />
          </template>
        </EasyDataTable>
      </div>
      <div class="actions">
        <v-btn color="success" size="small" @click="submitMoveBtnClick"
          >Submit</v-btn
        >
        <v-btn class="ml-2" @click="dialogState = false" size="small"
          >Close</v-btn
        >
      </div>
    </div>
  </GDialog>

  <GDialog max-width="1200" v-model="editDialogState">
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
        overflow-y="scorll"
      >
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="infoTabs">Information</v-tab>
          <v-tab value="confTabs">Configuration</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="infoTabs">
            <v-form>
              <v-container class="pl-12 pt-12 pr-12">
                <v-row>
                  <v-col cols="6">
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Type</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.info.type"
                          label="Type*"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Project</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.info.project"
                          label="Project*"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">IMEI</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.info.imei"
                          label="IMEI*"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">DeviceName</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.info.deviceName"
                          label="Device-Name*"
                          variant="solo"
                          multi-line
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">None-Mobile</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.info.nmb"
                          label="None-Mobile*"
                          variant="solo"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Address</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.info.addr"
                          label="Address*"
                          variant="solo"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Provinde</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.info.provinde"
                          label="Provinde*"
                          variant="solo"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Region</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          v-model="editModel.info.region"
                          label="Region*"
                          :items="['BKK', 'CR', 'ER', 'NR', 'NER', 'SR']"
                          variant="solo"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Lat / Long</span>
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
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-window-item>
          <v-window-item value="confTabs" scrollable>
            <v-form>
              <v-container class="pl-12 pt-12 pr-12">
                <v-row>
                  <v-col cols="6">
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Interval Times</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          v-model="editModel.conf.interval"
                          label="Interval Times"
                          :items="[
                            '2 min',
                            '5 min',
                            '10 min',
                            '15 min',
                            '30 min',
                          ]"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">OTA Status</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          v-model="editModel.conf.ota"
                          label="OTA Status"
                          :items="['0', '1']"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">OTA Version</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.conf.ota_ver"
                          label="OTA Version"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        &nbsp;
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-card variant="outlined">
                          <v-card-text class="py-0">
                            <v-checkbox
                              class="mb-0"
                              v-model="editModel.info.maintenance"
                              label="Maintanance"
                              hide-details="true"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="editModel.conf.action"
                              label="Inventory"
                              hide-details="true"
                            ></v-checkbox>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Server Destination</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.conf.server"
                          label="Server Destination"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">Port</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editModel.conf.port"
                          label="Port"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row
                      class="justify-center align-center"
                      v-if="editModel.conf.rtm != null"
                    >
                      <v-col cols="12" sm="4" class="text-right">
                        <span class="text-overline">RTM</span>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          v-model="editModel.conf.rtm"
                          label="RTM"
                          :items="['0', '1']"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-window-item>
        </v-window>
        <v-row class="mt-0 pl-12 pr-12 mb-12">
          <v-col cols="12" sm="12" class="text-right">
            <v-btn
              color="success"
              :disabled="disableEditSave"
              @click="editSave()"
            >
              submit
            </v-btn>
            <v-btn class="ml-4" @click="editDialogState = false"> Close </v-btn>
          </v-col>
        </v-row>
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
    editModel: {
      handler(newVal, oldVal) {
        //this.disableEditSave = JSON.parse(JSON.stringify({...newVal})).toString() === JSON.parse(this.tmpEditModel).toString() ? false : true;

        if (newVal.info.maintenance) {
          this.editModel.conf.action = false;
        }
        if (newVal.info.action) {
          this.editModel.conf.maintenance = false;
        }

        this.disableEditSave =
          JSON.stringify({ ...newVal }) === this.tmpEditModel;
      },
      deep: true,
    },
    $route(to, from) {
      this.loadInfo(this.inventoryId);
    },
  },
  data() {
    return {
      tab: null,
      date: null,
      searchTxt: "",
      selSearch: [
        { txt: "All", val: "all" },
        { txt: "Type", val: "device_type" },
        { txt: "DeviceName", val: "device_name" },
        { txt: "IMEI", val: "imei" },
        { txt: "NoneMobile", val: "none_mobile" },
      ],
      selected: { txt: "All", val: "all" },
      pageType: "",
      searchMoveField: ["name"],
      searchMovePj: "",
      sel_device_from: "",
      sel_project_dest: "050add00-5f6f-11ed-a2c8-b55147006237",
      sel_dashboard: "",
      dialogState: false,
      editDialogState: false,
      headers: [
        { text: "Status", value: "statusCode" },
        { text: "Sensor Status", value: "sensor" },
        { text: "Type", value: "type" },
        { text: "Device Name", value: "device_name" },
        { text: "IMEI", value: "imei" },
        { text: "Non Mobile", value: "none_mobile" },
        { text: "Customer Site Code", value: "addr" },
        { text: "Region", value: "region" },
        { text: "Last Update", value: "last_update" },
        { text: "Action", value: "action" },
      ],
      items: [],
      storeItems: [],
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
      inventoryId: "cf52e040-20a1-11ea-a4d0-9d921071e357",
      typefilter: {
        ready: true,
        new: true,
        maintenance: true,
      },
      intervelEdit: [
        { text: "2 min", value: "120" },
        { text: "5 min", value: "300" },
        { text: "10 min", value: "600" },
        { text: "15 min", value: "900" },
        { text: "30 min", value: "1800" },
      ],
      tmpEditModel: null,
      disableEditSave: true,
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
    submitSearch() {
      let _filterId = [];
      if (this.typefilter.maintenance) {
        _filterId.push(4);
      }
      if (this.typefilter.new) {
        _filterId.push(5);
      }
      if (this.typefilter.ready) {
        _filterId.push(6);
      }

      // Search Txt

      let _filter = this.storeItems;
      if (this.searchTxt.length > 0) {
        if (this.selected.val == "device_type") {
          _filter = _filter.filter((x) =>
            x.type.toLowerCase().includes(this.searchTxt.toLowerCase())
          );
        } else if (this.selected.val == "device_name") {
          _filter = _filter.filter(
            (x) =>
              x.device_name != null &&
              x.device_name.toLowerCase().includes(this.searchTxt.toLowerCase())
          );
        } else if (this.selected.val == "imei") {
          _filter = _filter.filter(
            (x) =>
              x.imei != null &&
              x.imei.toLowerCase().includes(this.searchTxt.toLowerCase())
          );
        } else if (this.selected.val == "none_mobile") {
          _filter = _filter.filter(
            (x) =>
              x.none_mobile != null &&
              x.none_mobile.toLowerCase().includes(this.searchTxt.toLowerCase())
          );
        } else {
          _filter = _filter.filter(
            (x) =>
              (x.type != null &&
                x.type.toLowerCase().includes(this.searchTxt.toLowerCase())) ||
              (x.device_name != null &&
                x.device_name
                  .toLowerCase()
                  .includes(this.searchTxt.toLowerCase())) ||
              (x.imei != null &&
                x.imei.toLowerCase().includes(this.searchTxt.toLowerCase())) ||
              (x.none_mobile != null &&
                x.none_mobile
                  .toLowerCase()
                  .includes(this.searchTxt.toLowerCase()))
          );
        }
      }

      // Date
      if (this.date != null) {
        let s_date = this.date[0];
        let e_date = this.date[1];

        _filter = _filter.filter(
          (x) => x.storeLastUpdate >= s_date && x.storeLastUpdate <= e_date
        );
      }

      // Status Search
      this.items = _filter.filter((x) => _filterId.includes(x.statusCode));

      this.serverItemsLength = this.items.length;
    },
    clearSearch() {
      this.typefilter = {
        ready: true,
        new: true,
        maintenance: true,
      };

      this.date = null;
      this.searchTxt = "";
      this.selected = { txt: "All", val: "all" };

      this.items = this.storeItems;
      this.serverItemsLength = this.items.length;
    },
    editSave() {
      let _nmb = this.editModel.info.nmb != null ? this.editModel.info.nmb : "";
      let _devicename =
        this.editModel.info.deviceName != null
          ? this.editModel.info.deviceName
          : "";
      const _ex = `{"none-mobile": "${_nmb}", "device-name": "${_devicename}"}`;

      let _body = JSON.parse(_ex);
      _body.addr =
        this.editModel.info.addr != null ? this.editModel.info.addr : "";
      _body.provinde =
        this.editModel.info.provinde != null
          ? this.editModel.info.provinde
          : "";
      _body.region =
        this.editModel.info.region != null ? this.editModel.info.region : "";
      _body.lat =
        this.editModel.info.lat != null ? this.editModel.info.lat : "";
      _body.long =
        this.editModel.info.long != null ? this.editModel.info.long : "";

      _body.maintenance = this.editModel.info.maintenance ? "true" : false;

      let __body = {};

      __body.interval = this.intervelEdit.filter(
        (y) => y.text == this.editModel.conf.interval.toString()
      )[0].value;
      __body.ota = this.editModel.conf.ota.toString();
      __body.ota_ver = this.editModel.conf.ota_ver.toString();
      __body.port = this.editModel.conf.port.toString();

      if (this.editModel.info.type == "R-Box") {
        __body.rtm = this.editModel.conf.rtm.toString();
      }

      __body.server = this.editModel.conf.server.toString();

      DeviceMgmtApi.SetServerScope(this.editModel.device_id, _body)
        .then((response) => {
          DeviceMgmtApi.SetSharedScope(this.editModel.device_id, __body)
            .then((_response) => {
              this.$swal.fire({
                icon: "success",
                title: "Success!",
                text: "Complete",
              });
              this.editDialogState = false;
              this.disableEditSave = true;
              this.loadInfo(this.projectId);
            })
            .catch((_err) => {
              console.log(err);
              this.$swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something Wrong",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something Wrong",
          });
        });
    },
    editInfo(item) {
      // Info
      this.editModel.device_id = item.device_id;
      this.editModel.info.type = item.type;
      this.editModel.info.project = "INVENTORY";
      this.editModel.info.addr = item.addr;
      this.editModel.info.provinde = item.provinde;
      this.editModel.info.imei = item.imei;
      this.editModel.info.region = item.region;
      this.editModel.info.deviceName = item.device_name;
      this.editModel.info.nmb = item.none_mobile;

      DeviceMgmtApi.GetServerScope(item.device_id)
        .then((_res) => {
          console.log(_res);
          this.editModel.info.lat = _res.filter((x) => x.key == "lat")[0].value;
          this.editModel.info.long = _res.filter(
            (x) => x.key == "long"
          )[0].value;
          console.log(_res.filter((x) => x.key == "maintenance")[0].value);
          this.editModel.info.maintenance =
            _res.filter((x) => x.key == "maintenance")[0].value == "true"
              ? true
              : false;

          DeviceMgmtApi.GetSharedScope(item.device_id)
            .then((__res) => {
              // Conf
              let tmp_interval = __res.filter((x) => x.key == "interval")[0]
                .value;

              console.log(tmp_interval);
              this.editModel.conf.interval = this.intervelEdit.filter(
                (y) => y.value == tmp_interval
              )[0].text;

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

              if (this.editModel.info.type == "R-Box") {
                this.editModel.conf.rtm = __res.filter(
                  (x) => x.key == "rtm"
                )[0].value;
              }

              this.tmpEditModel = JSON.stringify({ ...this.editModel });
              this.editDialogState = true;
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
    },
    submitMoveBtnClick() {
      // Write Info
      let _res = {};
      _res.date_first_install = new Date().toLocaleString();
      _res.reuse_count = "0";

      ReuseApi.GetListScope(this.sel_device_from).then((res1) => {
        ReuseApi.SetServerScope(this.sel_device_from, _res).then((res2) => {});
      });

      let payload = this.sel_project_dest + "/device/" + this.sel_device_from;
      ProjectApi.MoveDeviceToNewProject(payload)
        .then((response) => {
          // Fix Dashboard Issue
          DeviceMgmtApi.FixDashboardIssue(
            this.sel_dashboard,
            this.sel_project_dest
          ).then();

          this.$swal.fire({
            icon: "success",
            title: "Success!",
            text: "Complete",
          });
          this.loadInfo(this.inventoryId);
          this.dialogState = false;
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something Wrong",
          });
          this.loadInfo(this.inventoryId);
          this.dialogState = false;
        });
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
                // Fix Dashboard Issue
                let _dashboardId = item.dashboard_url
                  .split("?publicId=")[0]
                  .split("/dashboards/")
                  .slice(-1)[0];
                DeviceMgmtApi.FixDashboardIssue(
                  _dashboardId,
                  this.sel_project_unlist_dest
                ).then();

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
      this.sel_dashboard = item.dashboard_url
        .split("?publicId=")[0]
        .split("/dashboards/")
        .slice(-1)[0];
      this.sel_device_from = item.device_id;
      this.dialogState = true;
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
      DeviceMgmtApi.DeviceList(newProjectId, this.pageType)
        .then((response) => {
          console.log(response.data);
          response.data.forEach((ele, index) => {

            let _currentLastUpdate = new Date(parseInt(ele.last_update));
            ele.storeLastUpdate = _currentLastUpdate;

            ele.last_update = new Date(
              parseInt(ele.last_update)
            ).toLocaleString();

            let _currentStatus = 6;
            if (ele.last_update == "Invalid Date") {
              // New
              _currentStatus = 5;
            } else {
              if (ele.maintenance == "true") {
                // Maintanance
                _currentStatus = 4;
              } else {
                // Ready To Implement
                _currentStatus = 6;
              }
            }

            // Defind Status
            ele.statusCode = _currentStatus;
          });

          this.serverItemsLength = response.data.length;
          this.items = response.data;
          this.storeItems = response.data;
          this.serveSideloading = false;
        })
        .catch((err) => {
          console.log(err);
          this.items = [];
          this.serverItemsLength = 0;
          this.serveSideloading = false;
        });

      ProjectApi.PhpProjectList()
        .then((response) => {
          this.items_move = response.data.filter(
            (x) =>
              x.name != "INVENTORY" && x.name != "UNLIST" && x.name != "REUSE"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    ProjectApi.PhpProjectList()
      .then((response) => {
        this.inventoryId = response.data.filter(
          (x) => x.name == "INVENTORY"
        )[0].id;
        this.loadInfo(this.inventoryId);
      })
      .catch((err) => {
        console.log(err);
      });

    // let _res = {};
    // _res.reuse_count = "_can write?";
    // _res.date_first_install = "xan write?";
    // _res.date_in_stock = "3an write?";
    // ReuseApi.SetServerScope("6e739eb0-15f3-11ec-aa9a-51d72ec5acff", _res)
    //     .then(response => {
    //         this.$swal.fire({
    //             icon: 'success',
    //             title: 'Success!',
    //             text: "Complete"
    //         })
    //         this.searchPj();
    //     }).catch(err => {
    //         console.log(err);
    //         this.$swal.fire({
    //             icon: 'error',
    //             title: 'Error!',
    //             text: "Something Wrong"
    //         })
    //     })
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
