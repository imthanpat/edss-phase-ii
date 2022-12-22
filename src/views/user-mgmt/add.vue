<template>
  <v-card width="inherit" class="mx-auto">
    <v-toolbar
      color="grey darken-4"
      style="background-color: rgb(72, 73, 71) !important"
    >
      <v-toolbar-title
        ><h6 class="text-h6" style="color: white">
          <v-icon color="white" size="small"> mdi-plus </v-icon> Add / Import
          User
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
        <v-tab value="infoTabs">Add User</v-tab>
        <v-tab value="confTabs">Import User</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="infoTabs">
          <v-form>
            <v-container class="pl-12 pt-12 pr-12">
              <v-row>
                <v-col cols="6">
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Level</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        label="Level*"
                        :items="['Admin', 'User']"
                        variant="solo"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Manage Projects</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        label="Manage Projects*"
                        :items="['Admin', 'User']"
                        variant="solo"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right"> Manage All Project </v-col>
                    <v-col cols="12" sm="6">
                        <v-checkbox
                            class="mb-0"
                            hide-details="true"
                          ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Email(Username)</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Email*"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Password</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editModel.info.project"
                        label="Project*"
                        :type="'password'"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Confirm Password</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editModel.info.project"
                        label="Project*"
                        :type="'password'"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">FirstName</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="FirstName*"
                        variant="solo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Lastname</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Lastname*"
                        variant="solo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Department</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Department*"
                        variant="solo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Tel</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Tel*"
                        variant="solo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-col cols="12" sm="4" class="text-right">
                      <span class="text-overline">Status</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        label="Status*"
                        :items="['enable', 'disable']"
                        variant="solo"
                      ></v-autocomplete>
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
                    <v-col cols="12" sm="4" class="text-right"> &nbsp; </v-col>
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
        <v-col cols="12" sm="12" class="text-right mr-10">
          <v-btn
            color="success"
            :disabled="disableEditSave"
            @click="editSave()"
          >
            submit
          </v-btn>
        </v-col>
      </v-row>
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

      if (valid) {
        this.processAddDevice();
      }
    },
    reset() {
      this.$refs.form.reset();
      this.editModel.info.project = this.projects[0];
      this.editModel.conf.server = "182.52.50.211";
      this.editModel.conf.port = 5683;
    },
    processAddDevice() {
      console.log(this.editModel.info);
    },
    initPage() {
      ProjectApi.PhpProjectList()
        .then((response) => {
          this.projects = response.data.filter(
            (x) => x.name != "REUSE" && x.name != "UNLIST"
          );

          this.editModel.info.project = this.projects[0];
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
