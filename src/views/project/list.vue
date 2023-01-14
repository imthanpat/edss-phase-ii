<template>
  <v-card class="mt-5 ml-5 mr-5">
    <v-toolbar
      color="grey darken-4"
      style="background-color: rgb(72, 73, 71) !important"
    >
      <v-toolbar-title>
        <h6 class="text-h6" style="color: white">Project List(s)</h6>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-item>
      <div>
        <div class="text-overline">Project Filter</div>
      </div>
    </v-card-item>
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
      <v-row no-gutters>
        <v-col cols="2">&nbsp;</v-col>
        <v-col cols="6" class="pa-2">
          <v-radio-group v-model="selDateSearchType" class="text-left">
            <v-radio value="lastupdate">
              <template v-slot:label> Last Update </template>
            </v-radio>
            <v-radio value="createdate">
              <template v-slot:label> Create Date </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row no-gutters class="mb-2">
        <v-col cols="2" class="pa-2">&nbsp;</v-col>
        <v-col cols="6" class="pa-2">
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
        <v-col cols="2">&nbsp;</v-col>
        <v-col cols="6" class="pa-2">
          <v-btn @click="submitSearch" color="success">
            <span style="color: white">Submit</span>
          </v-btn>
          <v-btn class="ml-4" @click="clearSearch"> Clear </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <p class="text-left mt-5 mb-5 ml-5">
    <span class="text-subtitle-2">Total Project(s) : </span
    ><v-chip size="small">{{ items.length }}</v-chip>
  </p>
  <EasyDataTable
    class="mt-5 ml-5 mr-5"
    :rows-per-page="5"
    :rows-items="[5, 10, 25, 100]"
    :headers="headers"
    :loading="serveSideloading"
    :items="items"
    alternating
    theme-color="#8DC73F"
  >
    <template #item-action="item">
      <v-btn-group v-if="item.actionBtn && level != 'user'">
        <v-btn size="small" icon="mdi-pencil" @click="editAction(item)"></v-btn>
        <v-btn
          v-if="item.id != mvcomsProjectId"
          size="small"
          icon="mdi-trash-can"
          @click="delBtnClick(item)"
        ></v-btn>
      </v-btn-group>
    </template>
  </EasyDataTable>
  <v-dialog
    max-width="900px"
    v-model="isActive"
    style="z-index: 900 !important"
  >
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar
          color="rgb(72, 73, 71)"
          style="color: white"
          title="Edit Project Information"
        >
          <v-spacer></v-spacer>
          <v-btn style="color: white" icon @click="isActive.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mb-5">
          <v-row class="justify-center align-center">
            <template v-if="alert">
              <!-- <v-col cols="12" sm="4" class="text-right"> &nbsp; </v-col> -->
              <v-col cols="12" sm="12">
                <v-alert
                  variant="outlined"
                  type="error"
                  prominent
                  border="top"
                  class="text-caption"
                >
                  Plase Check Image Resolution Allow width:1200 px , height:800
                  px Only!
                </v-alert>
              </v-col>
            </template>
            <v-col cols="12" sm="4" class="text-right">
              <span class="text-overline"
                >Project-Name<span style="color: red">*</span></span
              >
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                hide-details="true"
                v-model="editInfo.name"
                label="Project-Name *"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" class="text-right h-100">
              <span class="text-overline flex-grow-1"
                >Device Type<span style="color: red">*</span></span
              >
            </v-col>
            <v-col cols="12" sm="6">
              <v-row>
                <v-checkbox
                  v-model="editInfo.abox"
                  label="A-Box"
                  hide-details
                />
                <v-checkbox
                  v-model="editInfo.wbox"
                  label="W-Box"
                  hide-details
                />
                <v-checkbox
                  v-model="editInfo.vabox"
                  label="VA-Box"
                  hide-details
                />
                <v-checkbox
                  v-model="editInfo.thbox"
                  label="TH-Box"
                  hide-details
                />
                <v-checkbox
                  v-model="editInfo.rbox"
                  label="R-Box"
                  hide-details
                />
              </v-row>
            </v-col>

            <template v-if="editInfo.thbox">
              <v-col cols="12" sm="4" class="text-right h-100">
                <span class="text-overline flex-grow-1">Project Layout</span>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input
                  @change="Preview_image"
                  v-model="files"
                  counter
                  label="File input" 
                  variant="underlined"
                  prepend-icon="mdi-paperclip"
                  :hide-details="true"
                  :show-size="1000"
                  accept="image/*"
                >
                  <template v-slot:selection="{ fileNames }">
                    <template
                      v-for="(fileName, index) in fileNames"
                      :key="fileName"
                    >
                      <v-chip
                        v-if="index < 2"
                        color="light-green-darken-2"
                        label
                        size="small"
                        class="mr-2"
                      >
                        {{ fileName }}
                      </v-chip>

                      <span
                        v-else-if="index === 2"
                        class="text-overline text-grey-darken-3 mx-2"
                      >
                        +{{ files.length - 2 }} File(s)
                      </span>
                    </template>
                  </template>
                </v-file-input>
              </v-col>

              <!-- <template v-if="alert">
              <v-col cols="12" sm="4" class="text-right"> &nbsp; </v-col>
              <v-col cols="12" sm="6">
                <v-alert
                  variant="outlined"
                  type="error"
                  prominent
                  border="top"
                  class="text-caption"
                >
                  Plase Check Image Resolution <br />
                  width:1200 px , height:800 px Only!
                </v-alert>
              </v-col>
              </template> -->

              <v-col cols="12" sm="4" class="text-right">
                Layout Preview
              </v-col>
              <v-col cols="12" sm="6">
                <v-img :src="editInfo.layoutSrc"></v-img>
              </v-col>

              <v-col cols="12" sm="4" class="text-right"> &nbsp; </v-col>
              <v-col cols="12" sm="6">
                <v-alert
                  variant="outlined"
                  type="warning"
                  prominent
                  border="top"
                  class="text-caption"
                >
                  Image Allow : width:1200 px , height:800 px Only!
                </v-alert>
              </v-col>
            </template>

            <v-col cols="12" sm="4" class="text-right"> &nbsp; </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                size="small"
                color="success"
                :disabled="disableSave"
                @click="saveEdit()"
              >
                <span style="color: white">Submit</span>
              </v-btn>
              <v-btn size="small" class="ml-4" @click="resetEdit()">
                Reset
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import ProjectApi from "../../services/ProjectApi";
import LoginApi from "../../services/LoginApi";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    EasyDataTable,
    Datepicker,
  },
  watch: {
    editInfo: {
      handler(newVal, oldVal) {
        this.disableSave = JSON.stringify({ ...newVal }) === this.tmpEditInfo;
      },
      deep: true,
    },
  },
  methods: {
    async Preview_image() {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const photoUrl = URL.createObjectURL(this.files[0]);
      const image = new Image();
      const imageDimensions = await new Promise((resolve) => {
        image.onload = () => {
          const dimensions = {
            height: image.height,
            width: image.width,
          };
          resolve(dimensions);
        };
        image.src = photoUrl;
      });

      if (imageDimensions.width == 1200 && imageDimensions.height == 800) {
        //this.editInfo.layoutSrc = URL.createObjectURL(this.files[0]);
        this.editInfo.layoutSrc = await toBase64(this.files[0]);
      } else {
        this.alert = true;
        self = this;
        setTimeout(function () {
          self.alert = false;
          self.files = [];
          self.editInfo.layoutSrc = null;
        }, 4000);
        this.resetEdit();
      }
    },
    submitSearch() {
      // Search Txt

      let _filter = this.storeItems;
      if (this.searchTxt.length > 0) {
        _filter = _filter.filter((x) =>
          x.name.toLowerCase().includes(this.searchTxt.toLowerCase())
        );
      }

      // Date
      if (this.date != null) {
        let s_date = this.date[0];
        let e_date = this.date[1];

        if (this.selDateSearchType == "lastupdate") {
          _filter = _filter.filter(
            (x) => x.storeLastUpdate >= s_date && x.storeLastUpdate <= e_date
          );
        } else {
          _filter = _filter.filter(
            (x) => x.storeCreateDate >= s_date && x.storeCreateDate <= e_date
          );
        }
      }

      this.items = _filter;
      this.serverItemsLength = this.items.length;
    },
    clearSearch() {
      this.date = null;
      this.searchTxt = "";
      this.selected = { txt: "Projects", val: "name" };

      this.items = this.storeItems;
      this.serverItemsLength = this.items.length;
    },
    loadInfo() {
      this.serveSideloading = true;
      ProjectApi.PhpProjectList()
        .then((response) => {
          response.data.forEach((ele) => {
            ele.storeLastUpdate = new Date(parseInt(ele.lastupdate));
            ele.storeCreateDate = new Date(ele.createdate);

            var usercreate = ele.usercreate != null ? ele.usercreate + " " : "";
            var lastupdateuser =
              ele.lastupdateuser != null ? ele.lastupdateuser + " " : "";
            ele.createdate =
              new Date(ele.createdate) == "Invalid Date"
                ? ""
                : usercreate + new Date(ele.createdate).toLocaleString();
            ele.lastupdate =
              new Date(parseInt(ele.lastupdate)) == "Invalid Date"
                ? ""
                : lastupdateuser +
                  new Date(parseInt(ele.lastupdate)).toLocaleString();
            ele.actionBtn =
              ele.name != "INVENTORY" &&
              ele.name != "UNLIST" &&
              ele.name != "REUSE"
                ? true
                : false;
          });
          this.items = response.data;
          this.storeItems = response.data;
          this.serveSideloading = false;
        })
        .catch((err) => {
          this.serveSideloading = true;
          const e = err.response.data;
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
    saveEdit() {
      let _nameChangePayload = {};
      let _id = {};
      _id.entityType = "CUSTOMER";
      _id.id = this.editInfo.id;

      _nameChangePayload.id = _id;
      _nameChangePayload.createdTime = 0;
      _nameChangePayload.title = this.editInfo.name;

      // Change Name
      ProjectApi.SetNameProject(_nameChangePayload)
        .then((response) => {
          console.log(response);
          // Set DeviceType
          let _deviceType = {};
          _deviceType["A-Box"] = this.editInfo.abox ? "true" : "";
          _deviceType["W-Box"] = this.editInfo.wbox ? "true" : "";
          _deviceType["TH-Box"] = this.editInfo.thbox ? "true" : "";
          _deviceType["VA-Box"] = this.editInfo.vabox ? "true" : "";
          _deviceType["R-Box"] = this.editInfo.rbox ? "true" : "";
          _deviceType.lastUpdate = Math.floor(Date.now()).toString();
          if (this.editInfo.thbox) {
            this.editInfo.dashboardConf.configuration.states.default.layouts.main.gridSettings.backgroundImageUrl =
              this.editInfo.layoutSrc;
            ProjectApi.SetProjectLayout(this.editInfo.dashboardConf).then();
          }
          ProjectApi.SetServerScope(this.editInfo.id, _deviceType).then();
          ProjectApi.PhpMakePojectPublic(this.editInfo.id).then();
          this.isActive = false;
          this.disableSave = true;
          this.loadInfo();

          this.$swal.fire({
            icon: "success",
            title: "Success!",
            text: "Complete",
          });
        })
        .catch((err) => {
          console.log(err);
          const e = err.response.data;
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
    resetEdit() {
      this.editInfo = JSON.parse(this.tmpEditInfo);
    },
    delBtnClick(item) {
      if (item.cnt != 0) {
        this.$swal.fire({
          icon: "error",
          title: "Error",
          text: "Project Is Not Empty",
        });
      } else {
        var self = this;
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You want Delete This Project ?",
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
              ProjectApi.DeleteProject(item.id).then();
              this.$swal.fire({
                icon: "success",
                title: "Success!",
                text: "Complete",
              });
              self.loadInfo();
            }
          });
      }
    },
    editAction(item) {
      this.editInfo.id = item.id;
      this.editInfo.name = item.name;
      ProjectApi.GetListScope(item.id)
        .then((response) => {
          console.log(response);
          var tmpEditInfo = {};
          this.editInfo.abox =
            response.find((o) => o.key === "A-Box").value == true ||
            response.find((o) => o.key === "A-Box").value == "true"
              ? true
              : false;
          this.editInfo.wbox =
            response.find((o) => o.key === "W-Box").value == true ||
            response.find((o) => o.key === "W-Box").value == "true"
              ? true
              : false;
          this.editInfo.vabox =
            response.find((o) => o.key === "VA-Box").value == true ||
            response.find((o) => o.key === "VA-Box").value == "true"
              ? true
              : false;
          this.editInfo.rbox =
            response.find((o) => o.key === "R-Box").value == true ||
            response.find((o) => o.key === "R-Box").value == "true"
              ? true
              : false;
          this.editInfo.thbox =
            response.find((o) => o.key === "TH-Box").value == true ||
            response.find((o) => o.key === "TH-Box").value == "true"
              ? true
              : false;

          if (this.editInfo.thbox) {
            this.editInfo.dashboardId = response
              .find((o) => o.key === "map-url")
              .value.split("/dashboards/")
              .slice(-1)[0];
            ProjectApi.GetProjectDashboard(this.editInfo.dashboardId).then(
              (_res) => {
                this.editInfo.dashboardConf = _res;
                this.editInfo.layoutSrc =
                  _res.configuration.states.default.layouts.main.gridSettings.backgroundImageUrl;
                this.tmpEditInfo = JSON.stringify({ ...this.editInfo });
              }
            );
          } else {
            this.tmpEditInfo = JSON.stringify({ ...this.editInfo });
          }
        })
        .catch((err) => {
          console.log(err);
          const e = err.response.data;
          if (e.status == 401 && e.errorCode == 11) {
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: e.message,
            });
            this.$router.push("/login");
          }
        });

      this.isActive = true;
    },
  },
  data() {
    return {
      mvcomsProjectId: "",
      alert: false,

      url: null,
      files: [],

      level: "",
      selDateSearchType: "lastupdate",
      date: null,
      searchTxt: "",
      selSearch: [{ txt: "Projects", val: "name" }],
      selected: { txt: "Projects", val: "name" },
      serveSideloading: true,
      disableSave: true,
      isActive: false,
      headers: [
        { text: "Project", value: "name", sortable: true },
        { text: "Device(s)", value: "cnt", sortable: true },
        { text: "Last Modify/By", value: "lastupdate", sortable: true },
        { text: "Create Date/By", value: "createdate", sortable: true },
        { text: "Action", value: "action" },
      ],
      items: [],
      storeItems: [],
      tmpEditInfo: null,
      editInfo: {
        id: null,
        name: null,
        abox: null,
        wbox: null,
        vabox: null,
        thbox: null,
        rbox: null,
        dashboardId: null,
        layoutSrc: null,
        dashboardConf: null,
      },
    };
  },
  mounted() {
    this.mvcomsProjectId = `${process.env.VUE_APP_MVCOMS_PROJECTID}`;
    this.level = localStorage.getItem("level");
    this.loadInfo();
  },
};
</script>
<style>
.swal2-show {
  z-index: 300000 !important;
}
</style>
