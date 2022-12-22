<template class="pa-5">
  <v-row v-if="widgetShow" class="pt-4 pb-4">
    <v-col col="3">
      <v-card v-if="widget1.active" class="mx-auto">
        <v-card-item :title="widget1.txt"></v-card-item>
        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ widget1.val }} </v-col>

            <v-col cols="6" class="text-right">
              <v-icon
                color="rgb(72, 73, 71)"
                :icon="widget1.icon"
                size="40"
              ></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="d-flex py-0 justify-space-between">
          <v-list-item>
            <v-list-item-subtitle class="text-caption"
              >Summary for this projects</v-list-item-subtitle
            >
          </v-list-item>
        </div>
      </v-card>
    </v-col>
    <v-col col="3">
      <v-card v-if="widget2.active" class="mx-auto">
        <v-card-item :title="widget2.txt"></v-card-item>
        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ widget2.val }} </v-col>

            <v-col cols="6" class="text-right">
              <v-icon
                color="rgb(72, 73, 71)"
                :icon="widget2.icon"
                size="40"
              ></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="d-flex py-0 justify-space-between">
          <v-list-item>
            <v-list-item-subtitle class="text-caption"
              >Summary for this projects</v-list-item-subtitle
            >
          </v-list-item>
        </div>
      </v-card>
    </v-col>
    <v-col col="3">
      <v-card v-if="widget3.active" class="mx-auto">
        <v-card-item :title="widget3.txt"></v-card-item>
        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ widget3.val }} </v-col>

            <v-col cols="6" class="text-right">
              <v-icon
                color="rgb(72, 73, 71)"
                :icon="widget3.icon"
                size="40"
              ></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="d-flex py-0 justify-space-between">
          <v-list-item>
            <v-list-item-subtitle class="text-caption"
              >Summary for this projects</v-list-item-subtitle
            >
          </v-list-item>
        </div>
      </v-card>
    </v-col>
    <v-col col="3">
      <v-card v-if="widget4.active" class="mx-auto">
        <v-card-item :title="widget4.txt"></v-card-item>
        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ widget4.val }} </v-col>

            <v-col cols="6" class="text-right">
              <v-icon
                color="rgb(72, 73, 71)"
                :icon="widget4.icon"
                size="40"
              ></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="d-flex py-0 justify-space-between">
          <v-list-item>
            <v-list-item-subtitle class="text-caption"
              >Summary for this projects</v-list-item-subtitle
            >
          </v-list-item>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-row align="center" no-gutters>
    <v-col cols="4">
      <canvas id="statusChart"></canvas>
    </v-col>
    <v-col cols="8" class="pa-2">
      <v-toolbar
        color="grey darken-4"
        style="background-color: rgb(72, 73, 71) !important"
        rounded=""
      >
        <v-toolbar-title>
          <h6 class="text-h6" style="color: white">Search</h6>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card class="pa-5">
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
              v-model="searchTxt"
              :counter="255"
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
              placeholder="Select :: StartDate - EndDate"
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
                  v-model="typefilter.online"
                  label="Online"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="typefilter.offline"
                  label="Offline"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="typefilter.dead"
                  label="Dead"
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
          <v-col cols="4">&nbsp;</v-col>
          <v-col cols="8" class="pa-2">
            <v-btn @click="submitSearch()" color="success" :disabled="false">
              submit
            </v-btn>
            <v-btn class="ml-4" @click="clearSearch()"> Clear </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <!-- <p class="text-left mt-2 mb-2">
    <span class="text-subtitle-2">Debugs : </span
    ><v-chip size="small">{{ projectId }}</v-chip>
  </p> -->
  <p class="text-left mt-2 mb-2">
    <span class="text-subtitle-2">Total Device(s) : </span
    ><v-chip size="small">{{ serverItemsLength }}</v-chip>
  </p>
  <!-- <EasyDataTable
    style="white-space: nowrap"
    :rows-items="[10, 25, 50, 100]"
    v-model:server-options="serverOptions"
    :server-items-length="serverItemsLength"
    :loading="serveSideloading"
    :headers="headers"
    :items="items"
    buttons-pagination
  > -->
  <EasyDataTable
    style="white-space: nowrap"
    :rows-per-page="10"
    :rows-items="[10, 25, 50, 100]"
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
      <v-btn-group rounded="x2" v-if="level != 'user'">
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
      </v-btn-group>

      <v-btn-group rounded="x2" v-if="level == 'user'">
        <v-btn
          size="small"
          icon="mdi-view-dashboard"
          @click="viewDashboard(item)"
        ></v-btn>
      </v-btn-group>
    </template>
  </EasyDataTable>
  <GDialog max-width="1200" height="inherit" v-model="dialogState" scrollable>
    <v-card width="inherit" height="inherit" class="">
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
        style="margin-bottom: 50px;padding: 0px;"
        class="iframe-full"
      >
        <iframe
          class="iframe-full"
          style="overflow-y:scroll"
          frameborder="0"
          :src="currentDashboard"
        ></iframe>
      </v-card-text>
    </v-card>
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
import Chart from "chart.js";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";


var _chartStatus = null;

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
    serverOptions(val) {
      this.loadInfo(this.projectId);
    },
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
    projectId(newvalue, oldvalue) {
      this.typefilter = {
        online: true,
        offline: true,
        dead: true,
        new: true,
        maintenance: true,
      };

      this.createChart();
      this.loadInfo(newvalue);
    },
    $route(to, from) {
      this.typefilter = {
        online: true,
        offline: true,
        dead: true,
        new: true,
        maintenance: true,
      };
      this.createChart();
      this.loadInfo(this.projectId);
    },
    items(newVal, oldVal) {
      this.chartStatus = {
        online: 0,
        offline: 0,
        dead: 0,
        maintanance: 0,
        new: 0,
      };
      newVal.forEach((_ele) => {
        if (_ele.statusCode == 1) {
          this.chartStatus.online = this.chartStatus.online + 1;
        } else if (_ele.statusCode == 2) {
          this.chartStatus.offline = this.chartStatus.offline + 1;
        } else if (_ele.statusCode == 3) {
          this.chartStatus.dead = this.chartStatus.dead + 1;
        } else if (_ele.statusCode == 4) {
          this.chartStatus.maintanance = this.chartStatus.maintanance + 1;
        } else if (_ele.statusCode == 5) {
          this.chartStatus.new = this.chartStatus.new + 1;
        }
      });

      // Update Chart
      this.updateChart();

      // Draw Chart
      // let dataStatusChart = {
      //   labels: ["Dead", "Offline", "Online", "Maintanance", "New"],
      //   datasets: [
      //     {
      //       label: "My First Dataset",
      //       data: [
      //         this.chartStatus.dead == 0 ? "N/A" : this.chartStatus.dead,
      //         this.chartStatus.offline == 0 ? "N/A" : this.chartStatus.offline,
      //         this.chartStatus.online == 0 ? "N/A" : this.chartStatus.online,
      //         this.chartStatus.maintanance == 0 ? "N/A" : this.chartStatus.maintanance,
      //         this.chartStatus.new == 0 ? "N/A" : this.chartStatus.new,
      //       ],
      //       backgroundColor: [
      //         "rgb(255, 99, 132)",
      //         "rgb(255, 159, 64)",
      //         "#009644",
      //         "gray",
      //         "#36a2eb",
      //       ],
      //       hoverOffset: 4,
      //     },
      //   ],
      // };

      // new Chart(document.getElementById("statusChart"), {
      //   type: "doughnut",
      //   data: dataStatusChart,
      //   options: {
      //     legend: {
      //         display: false
      //       },
      //     plugins: {
      //       legend: { display: false },
      //     },
      //     aspectRatio: 1.5,
      //   },
      // });
    },
  },
  data() {
    return {
      level: "",
      date: null,
      searchTxt: "",
      selSearch: [
        { txt: "All", val: "all" },
        { txt: "Type", val: "device_type" },
        { txt: "DeviceName", val: "device_name" },
        { txt: "IMSI", val: "imsi" },
        { txt: "NoneMobile", val: "none_mobile" },
      ],
      selected: { txt: "All", val: "all" },
      widgetShow: false,
      widget1: {
        txt: "",
        val: "",
        icon: "mdi-flare",
        actice: false,
      },
      widget2: {
        txt: "",
        val: "",
        icon: "mdi-flare",
        actice: false,
      },
      widget3: {
        txt: "",
        val: "",
        icon: "mdi-flare",
        actice: false,
      },
      widget4: {
        txt: "",
        val: "",
        icon: "mdi-flare",
        actice: false,
      },
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
      storeItems: [],
      serveSideloading: true,
      serverOptions: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "last_update",
        sortType: "asc",
      },
      serverItemsLength: 0,
      headers_move: [
        { text: "", value: "id" },
        { text: "Project Name", value: "name" },
      ],
      items_move: [],
      currentDashboard: "",
      typefilter: {
        online: true,
        offline: true,
        dead: true,
        new: true,
        maintenance: true,
      },
      chartStatus: {
        online: 0,
        offline: 0,
        dead: 0,
        maintanance: 0,
        new: 0,
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
    createChart() {
      // Draw Chart
      let dataStatusChart = {
        labels: ["Dead", "Offline", "Online", "Maintanance", "New"],
        datasets: [
          {
            label: "My First Dataset",
            data: [
              this.chartStatus.dead == 0 ? "N/A" : this.chartStatus.dead,
              this.chartStatus.offline == 0 ? "N/A" : this.chartStatus.offline,
              this.chartStatus.online == 0 ? "N/A" : this.chartStatus.online,
              this.chartStatus.maintanance == 0 ? "N/A" : this.chartStatus.maintanance,
              this.chartStatus.new == 0 ? "N/A" : this.chartStatus.new,
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "#009644",
              "gray",
              "#36a2eb",
            ],
            hoverOffset: 4,
          },
        ],
      };

      let _ctxx = document.getElementById("statusChart");
      let chartStatusxx = new Chart(_ctxx);
      if (chartStatusxx != undefined) {
        chartStatusxx.destroy();
      }

      _chartStatus = new Chart(document.getElementById("statusChart"), {
        type: "doughnut",
        data: dataStatusChart,
        options: {
          legend: {
              display: false
            },
          plugins: {
            legend: { display: false },
          },
          aspectRatio: 1.5,
        },
      });

      document.getElementById("statusChart").style.display = "none";
    },
    updateChart() {
      let _newStatus = [0, 0, 0, 0, 0]; // ["Dead", "Offline", "Online", "Maintanance", "New"]
      _newStatus[0] = this.chartStatus.dead;
      _newStatus[1] = this.chartStatus.offline;
      _newStatus[2] = this.chartStatus.online;
      _newStatus[3] = this.chartStatus.maintanance;
      _newStatus[4] = this.chartStatus.new;

      if (_chartStatus != null) {
        _chartStatus.config.data.datasets[0].data = [
          _newStatus[0] == 0 ? "N/A" : _newStatus[0],
          _newStatus[1] == 0 ? "N/A" : _newStatus[1],
          _newStatus[2] == 0 ? "N/A" : _newStatus[2],
          _newStatus[3] == 0 ? "N/A" : _newStatus[3],
          _newStatus[4] == 0 ? "N/A" : _newStatus[4]
        ];
        _chartStatus.update();
        document.getElementById("statusChart").style.display = "";
      }
    },
    submitSearch() {
      let _filterId = [];
      if (this.typefilter.online) {
        _filterId.push(1);
      }
      if (this.typefilter.offline) {
        _filterId.push(2);
      }
      if (this.typefilter.dead) {
        _filterId.push(3);
      }
      if (this.typefilter.maintenance) {
        _filterId.push(4);
      }
      if (this.typefilter.new) {
        _filterId.push(5);
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
        } else if (this.selected.val == "imsi") {
          _filter = _filter.filter(
            (x) =>
              x.imsi != null &&
              x.imsi.toLowerCase().includes(this.searchTxt.toLowerCase())
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
              (x.imsi != null &&
                x.imsi.toLowerCase().includes(this.searchTxt.toLowerCase())) ||
              (x.none_mobile != null &&
                x.none_mobile
                  .toLowerCase()
                  .includes(this.searchTxt.toLowerCase()))
          );
        }
      }

      // Date
      if(this.date != null){
        let s_date = this.date[0];
        let e_date = this.date[1];
        let _debug = _filter[4].storeLastUpdate;

        _filter = _filter.filter(
          (x) =>
            x.storeLastUpdate >= s_date && x.storeLastUpdate <= e_date
        );
      }

      // Status Search
      this.items = _filter.filter((x) => _filterId.includes(x.statusCode));

      this.serverItemsLength = this.items.length;
    },
    clearSearch() {
      this.typefilter = {
        online: true,
        offline: true,
        dead: true,
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
      let _ex = `{"none-mobile": "${_nmb}", "device-name": "${_devicename}"}`;

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
      this.editModel.info.project = this.current_project_txt;
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
    viewDashboard(item) {
      let _uri = item.dashboard_url.split("?publicId=")[0];
      let _dashboardId = item.dashboard_url
                  .split("?publicId=")[0]
                  .split("/dashboards/")
                  .slice(-1)[0];
      this.currentDashboard = `${process.env.VUE_APP_ENDPOINT}/dashboards/${_dashboardId}?publicId=${this.projectId}`;
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
                // Fix Dashboard Issue
                let _dashboardId = item.dashboard_url
                  .split("?publicId=")[0]
                  .split("/dashboards/")
                  .slice(-1)[0];
                DeviceMgmtApi.FixDashboardIssue(
                  _dashboardId,
                  this.sel_project_reuse_dest
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
    setWidget() {
      this.widget1.active = false;
      this.widget2.active = false;
      this.widget3.active = false;
      this.widget4.active = false;
      this.widgetShow = false;

      DeviceMgmtApi.GetStatusOverview(this.projectId, this.pageType)
        .then((response) => {
          switch (this.$route.params.types) {
            case "abox":
              this.widget1.txt = "AC-Normal";
              this.widget1.val = response.data.first;
              this.widget1.icon = "mdi-flash";

              this.widget2.txt = "AC-Failure";
              this.widget2.val = response.data.second;
              this.widget2.icon = "mdi-flash-off";

              this.widget1.active = true;
              this.widget2.active = true;
              this.widgetShow = true;

              break;
            case "wbox":
              this.widget1.txt = "Optical-Connected";
              this.widget1.val = response.data.first;

              this.widget2.txt = "Optical-Disconnect";
              this.widget2.val = response.data.second;

              this.widget3.txt = "Current-Ok";
              this.widget3.val = response.data.third;

              this.widget4.txt = "Current-FAilure";
              this.widget4.val = response.data.fourth;

              this.widget1.active = true;
              this.widget2.active = true;
              this.widget3.active = true;
              this.widget4.active = true;
              this.widgetShow = true;
              break;
            case "thbox":
              this.widget1.txt = "OTemperature Ok";
              this.widget1.val = response.data.first;

              this.widget2.txt = "Temperature Ploblem";
              this.widget2.val = response.data.second;

              this.widget3.txt = "Humidity Ok";
              this.widget3.val = response.data.third;

              this.widget4.txt = "Humidity Ploblem";
              this.widget4.val = response.data.fourth;

              this.widget1.active = true;
              this.widget2.active = true;
              this.widget3.active = true;
              this.widget4.active = true;
              this.widgetShow = true;
              break;
            case "vabox":
              this.widget1.txt = "Volt Ploblem";
              this.widget1.val = response.data.first;

              this.widget2.txt = "Current Ploblem";
              this.widget2.val = response.data.second;

              this.widget3.txt = "Energy Ploblem";
              this.widget3.val = response.data.third;

              this.widget4.txt = "Power Ploblem";
              this.widget4.val = response.data.fourth;

              this.widget1.active = true;
              this.widget2.active = true;
              this.widget3.active = true;
              this.widget4.active = true;
              this.widgetShow = true;
              break;
            case "rbox":
              this.widget1.txt = "Load-ON";
              this.widget1.val = response.data.first;
              this.widget1.icon = "mdi-lightbulb-outline";

              this.widget2.txt = "Load-OFF";
              this.widget2.val = response.data.second;
              this.widget2.icon = "mdi-lightbulb-off";

              this.widget1.active = true;
              this.widget2.active = true;
              this.widgetShow = true;

              this.widgetShow = true;
              break;
            default:
              this.widgetShow = false;
          }
        })
        .catch((err) => {
          console.log(err);
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

      this.setWidget();

      this.serveSideloading = true;

      // Find Device
      ProjectApi.GetListScope(newProjectId)
        .then((_res) => {
          let _now = new Date();
          let _offline_period = _res.find((o) => o.key === "offline_period")
            ? _res.find((o) => o.key === "offline_period").value
            : 0;
          let _dead_period = _res.find((o) => o.key === "lost_period")
            ? _res.find((o) => o.key === "lost_period").value
            : 0;
          // console.log("offline => " + _offline_period);
          // console.log("dead => " + _dead_period);
          this.chartStatus.online = 0;
          this.chartStatus.offline = 0;
          this.chartStatus.dead = 0;
          this.chartStatus.maintanance = 0;

          //DeviceMgmtApi.DeviceListII(newProjectId, this.pageType, this.serverOptions.page, this.serverOptions.rowsPerPage, this.serverOptions.sortBy)
          DeviceMgmtApi.DeviceList(newProjectId, this.pageType)
            .then((response) => {
              if (response.data.length > 0) {
                response.data.forEach((_ele, _ix) => {
                  // To Timestamp

                  let _currentLastUpdate = new Date(parseInt(_ele.last_update));
                  _ele.storeLastUpdate = _currentLastUpdate;
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

                  //console.log(_ele.maintenance);
                  if (_ele.last_update == "Invalid Date") {
                    // New
                    _currentStatus = 5;
                  } else {
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
                  } else if (_currentStatus == 5) {
                    this.chartStatus.new = this.chartStatus.new + 1;
                  }
                });


                // Draw Chart
                let dataStatusChart = {
                  labels: ["Dead", "Offline", "Online", "Maintanance", "New"],
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: [
                        this.chartStatus.dead,
                        this.chartStatus.offline,
                        this.chartStatus.online,
                        this.chartStatus.maintanance,
                        this.chartStatus.new,
                      ],
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "#009644",
                        "gray",
                        "#36a2eb",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                };

                // let chartStatus = Chart.getChart("statusChart"); // <canvas> id
                // if (chartStatus != undefined) {
                //   chartStatus.destroy();
                // }
            //     let myChart = new Chart(
            //       document.getElementById("statusChart"),
            //       {
            //         type: "doughnut",
            //         data: dataStatusChart,

            //         options: {
            //           legend: {
            //   display: false
            // },
            //           plugins: {
            //             legend: { display: false },
            //           },
            //           aspectRatio: 1.5,
            //         },
            //       }
            //     );

                // Update Chart
                this.updateChart();

                // Store Data To Table
                this.serverItemsLength = response.data.length;
                this.items = response.data;
                this.storeItems = response.data;
              } else {
                // let chartStatus = Chart.getChart("statusChart"); // <canvas> id
                // if (chartStatus != undefined) {
                //   chartStatus.destroy();
                // }
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
    this.level = localStorage.getItem('level');
    this.createChart();
    this.loadInfo(this.projectId);
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

.iframe-full {
  width: -moz-available!important;
  width: -webkit-fill-available!important;
  
  height: 100%!important;
  height: -webkit-fill-available!important;
}
</style>
