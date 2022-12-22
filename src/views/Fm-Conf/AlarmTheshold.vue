<template>
  <div class="d-flex flex-column">
    <v-card class="mt-5 ml-5 mr-5">
      <v-toolbar
        color="grey darken-4"
        style="background-color: rgb(72, 73, 71) !important"
      >
        <v-toolbar-title>
          <h6 class="text-h6" style="color: white">Alarm Theshold</h6>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-item>
        <div>
          <div class="text-overline">FALSE MANAGEMENT CONFIG</div>
        </div>
      </v-card-item>

      <v-row no-gutters class="align-center fill-height">
        <v-col cols="6" v-if="listEnable.abox">
          <v-banner lines="two" color="deep-purple-accent-4">
            <template v-slot:prepend>
              <v-chip class="ml-10" variant="outlined"> A-Box </v-chip>
            </template>
            <template v-slot:text>
              <v-select
                v-if="level != 'user'"
                v-model="aboxThesholdCurrent"
                :items="thesholds"
                label="alarm theshold (* min)"
                persistent-hint
                return-object
                single-line
                style="max-width: 400px"
              ></v-select>
              <v-text-field
                v-if="level == 'user'"
                hide-details="true"
                v-model="aboxThesholdCurrent"
                readonly
              ></v-text-field>
            </template>
          </v-banner>
        </v-col>
        <v-col cols="6" v-if="listEnable.wbox">
          <v-banner lines="two" color="deep-purple-accent-4" m>
            <template v-slot:prepend>
              <v-chip class="ml-10" variant="outlined"> W-Box </v-chip>
            </template>
            <template v-slot:text>
              <v-select
                v-if="level != 'user'"
                v-model="wboxThesholdCurrent"
                :items="thesholds"
                label="alarm theshold (* min)"
                persistent-hint
                return-object
                single-line
                style="max-width: 400px"
              ></v-select>
              <v-text-field
                v-if="level == 'user'"
                hide-details="true"
                v-model="wboxThesholdCurrent"
                readonly
              ></v-text-field>
            </template>
          </v-banner>
        </v-col>
        <v-col cols="6" v-if="listEnable.vabox">
          <v-banner lines="two" color="deep-purple-accent-4">
            <template v-slot:prepend>
              <v-chip class="ml-10" variant="outlined"> VA-Box </v-chip>
            </template>
            <template v-slot:text>
              <v-select
                v-if="level != 'user'"
                v-model="vaboxThesholdCurrent"
                :items="thesholds"
                label="alarm theshold (* min)"
                persistent-hint
                return-object
                single-line
                style="max-width: 400px"
              ></v-select>
              <v-text-field
                v-if="level == 'user'"
                hide-details="true"
                v-model="vaboxThesholdCurrent"
                readonly
              ></v-text-field>
            </template>
          </v-banner>
        </v-col>
        <v-col cols="6" v-if="listEnable.rbox">
          <v-banner lines="two" color="deep-purple-accent-4">
            <template v-slot:prepend>
              <v-chip class="ml-10" variant="outlined"> R-Box </v-chip>
            </template>
            <template v-slot:text>
              <v-select
                v-if="level != 'user'"
                v-model="rboxThesholdCurrent"
                :items="thesholds"
                label="alarm theshold (* min)"
                persistent-hint
                return-object
                single-line
                style="max-width: 400px"
              ></v-select>
              <v-text-field
                v-if="level == 'user'"
                hide-details="true"
                v-model="rboxThesholdCurrent"
                readonly
              ></v-text-field>
            </template>
          </v-banner>
        </v-col>
        <v-col cols="6" v-if="listEnable.thbox">
          <v-banner lines="two" color="deep-purple-accent-4">
            <template v-slot:prepend>
              <v-chip class="ml-10" variant="outlined"> TH-Box </v-chip>
            </template>
            <template v-slot:text>
              <v-select
                v-if="level != 'user'"
                v-model="thboxThesholdCurrent"
                :items="thesholds"
                label="alarm theshold (* min)"
                persistent-hint
                return-object
                single-line
                style="max-width: 400px"
              ></v-select>
              <v-text-field
                v-if="level == 'user'"
                hide-details="true"
                v-model="thboxThesholdCurrent"
                readonly
              ></v-text-field>
            </template>
          </v-banner>
        </v-col>
        <v-col class="mt-5 mb-5 pl-5" cols="12" v-if="level != 'user'">
          <v-btn @click="submitEvent" color="success" :disabled="isSubmit">
            submit
          </v-btn>
          <v-btn class="ml-4" @click="resetEvent"> Reset </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-alert
      class="ma-5 text-caption"
      variant="outlined"
      type="warning"
      prominent
      border="top"
    >
      This Feature Effect All Device In Your Project immediately, Be Careful
    </v-alert>
  </div>
</template>

<script>
import Breadcrumb from "../../components/Fm-conf/breadcrumb.vue";
import FmconfApi from "../../services/FmconfApi";
import LoginApi from "../../services/LoginApi";

export default {
  components: {
    Breadcrumb,
  },
  computed: {
    projectId() {
      return this.$store.state.project.projectId;
    },
  },
  data: () => ({
    level: "",
    isSubmit: true,
    sel_project: "",
    projects: [],

    aboxThesholdCurrent: null,
    aboxThesholdTmp: null,

    wboxThesholdCurrent: null,
    wboxThesholdTmp: null,

    vaboxThesholdCurrent: null,
    vaboxThesholdTmp: null,

    rboxThesholdCurrent: null,
    rboxThesholdTmp: null,

    thboxThesholdCurrent: null,
    thboxThesholdTmp: null,

    thesholds: [1, 3, 5, 10, 15, 30, 60],
    listEnable: {
      abox: false,
      wbox: false,
      vabox: false,
      rbox: false,
      thbox: false,
    },
  }),
  methods: {
    resetEvent() {
      this.aboxThesholdCurrent = this.aboxThesholdTmp;
      this.wboxThesholdCurrent = this.wboxThesholdTmp;
      this.vaboxThesholdCurrent = this.vaboxThesholdTmp;
      this.rboxThesholdCurrent = this.rboxThesholdTmp;
      this.thboxThesholdCurrent = this.thboxThesholdTmp;
      this.isSubmit = true;
    },
    submitEvent() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want to Change Configuration This Device?",
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
          allowOutsideClick: () => !this.$swal.isLoading(),
        })
        .then((result) => {
          // Set Theshold
          let _res = {};
          //{threshold_abox: 5, threshold_rbox: 5}
          if (this.aboxThesholdCurrent != this.aboxThesholdTmp) {
            _res.threshold_abox = this.aboxThesholdCurrent;
          }
          if (this.wboxThesholdCurrent != this.wboxThesholdTmp) {
            _res.threshold_wbox = this.wboxThesholdCurrent;
          }
          if (this.vaboxThesholdCurrent != this.vaboxThesholdTmp) {
            _res.threshold_vabox = this.vaboxThesholdCurrent;
          }
          if (this.rboxThesholdCurrent != this.rboxThesholdTmp) {
            _res.threshold_rbox = this.rboxThesholdCurrent;
          }
          if (this.thboxThesholdCurrent != this.thboxThesholdTmp) {
            _res.threshold_thbox = this.thboxThesholdCurrent;
          }

          let sel_pj_id = this.projects.filter((x) =>
            x.name
              .toString()
              .toLowerCase()
              .includes(this.sel_project.toLowerCase())
          )[0].id.id;

          FmconfApi.SetListScope(sel_pj_id, _res)
            .then((response) => {
              this.$swal.fire({
                icon: "success",
                title: "Success!",
                text: "Complete",
              });
              this.searchPj();
            })
            .catch((err) => {
              console.log(err);
              this.$swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something Wrong",
              });
            });
          console.log(_res);
        });
    },
    searchPj() {
      this.listEnable.abox = false;
      this.listEnable.wbox = false;
      this.listEnable.vabox = false;
      this.listEnable.rbox = false;
      this.listEnable.thbox = false;

      // this.aboxThesholdCurrent = null;
      // this.aboxThesholdTmp = null;

      // this.wboxThesholdCurrent = null;
      // this.wboxThesholdTmp = null;

      // this.vaboxThesholdCurrent = null;
      // this.vaboxThesholdTmp = null;

      // this.rboxThesholdCurrent = null;
      // this.rboxThesholdTmp = null;

      // this.thboxThesholdCurrent = null;
      // this.thboxThesholdTmp = null;

      localStorage.setItem("current_pj", this.sel_project);
      let sel_pj_id = this.projects.filter((x) =>
        x.name.toString().toLowerCase().includes(this.sel_project.toLowerCase())
      )[0].id.id;

      FmconfApi.GetListScope(sel_pj_id)
        .then((response) => {
          this.listEnable.abox =
            response.find((o) => o.key === "A-Box").value == true ||
            response.find((o) => o.key === "A-Box").value == "true"
              ? true
              : false;
          this.listEnable.wbox =
            response.find((o) => o.key === "W-Box").value == true ||
            response.find((o) => o.key === "W-Box").value == "true"
              ? true
              : false;
          this.listEnable.vabox =
            response.find((o) => o.key === "VA-Box").value == true ||
            response.find((o) => o.key === "VA-Box").value == "true"
              ? true
              : false;
          this.listEnable.rbox =
            response.find((o) => o.key === "R-Box").value == true ||
            response.find((o) => o.key === "R-Box").value == "true"
              ? true
              : false;
          this.listEnable.thbox =
            response.find((o) => o.key === "TH-Box").value == true ||
            response.find((o) => o.key === "TH-Box").value == "true"
              ? true
              : false;

          if (this.listEnable.abox) {
            this.aboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_abox"
            ).value;
          }
          if (this.listEnable.wbox) {
            this.wboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_wbox"
            ).value;
          }
          if (this.listEnable.vabox) {
            this.vaboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_vabox"
            ).value;
          }
          if (this.listEnable.vabox) {
            this.rboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_rbox"
            ).value;
          }
          if (this.listEnable.vabox) {
            this.thboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_thbox"
            ).value;
          }

          this.aboxThesholdTmp = this.aboxThesholdCurrent;
          this.wboxThesholdTmp = this.wboxThesholdCurrent;
          this.vaboxThesholdTmp = this.vaboxThesholdCurrent;
          this.rboxThesholdTmp = this.rboxThesholdCurrent;
          this.thboxThesholdTmp = this.thboxThesholdCurrent;

          this.isSubmit = true;
        })
        .catch((err) => {
          console.log(err);
          const e = err.response.data;
          if (e.status == 401 && e.errorCode == 11) {
            this.$router.push("/alarmtheshold");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: e.message,
            });
            this.$router.push("/login");
          }
        });
    },
  },
  watch: {
    aboxThesholdCurrent(val) {
      if (
        this.aboxThesholdCurrent == this.aboxThesholdTmp &&
        this.wboxThesholdCurrent == this.wboxThesholdTmp &&
        this.vaboxThesholdCurrent == this.vaboxThesholdTmp &&
        this.rboxThesholdCurrent == this.rboxThesholdTmp &&
        this.thboxThesholdCurrent == this.thboxThesholdTmp
      ) {
        this.isSubmit = true;
      } else {
        this.isSubmit = false;
      }
    },
    wboxThesholdCurrent(val) {
      if (
        this.aboxThesholdCurrent == this.aboxThesholdTmp &&
        this.wboxThesholdCurrent == this.wboxThesholdTmp &&
        this.vaboxThesholdCurrent == this.vaboxThesholdTmp &&
        this.rboxThesholdCurrent == this.rboxThesholdTmp &&
        this.thboxThesholdCurrent == this.thboxThesholdTmp
      ) {
        this.isSubmit = true;
      } else {
        this.isSubmit = false;
      }
    },
    vaboxThesholdCurrent(val) {
      if (
        this.aboxThesholdCurrent == this.aboxThesholdTmp &&
        this.wboxThesholdCurrent == this.wboxThesholdTmp &&
        this.vaboxThesholdCurrent == this.vaboxThesholdTmp &&
        this.rboxThesholdCurrent == this.rboxThesholdTmp &&
        this.thboxThesholdCurrent == this.thboxThesholdTmp
      ) {
        this.isSubmit = true;
      } else {
        this.isSubmit = false;
      }
    },
    rboxThesholdCurrent(val) {
      if (
        this.aboxThesholdCurrent == this.aboxThesholdTmp &&
        this.wboxThesholdCurrent == this.wboxThesholdTmp &&
        this.vaboxThesholdCurrent == this.vaboxThesholdTmp &&
        this.rboxThesholdCurrent == this.rboxThesholdTmp &&
        this.thboxThesholdCurrent == this.thboxThesholdTmp
      ) {
        this.isSubmit = true;
      } else {
        this.isSubmit = false;
      }
    },
    thboxThesholdCurrent(val) {
      if (
        this.aboxThesholdCurrent == this.aboxThesholdTmp &&
        this.wboxThesholdCurrent == this.wboxThesholdTmp &&
        this.vaboxThesholdCurrent == this.vaboxThesholdTmp &&
        this.rboxThesholdCurrent == this.rboxThesholdTmp &&
        this.thboxThesholdCurrent == this.thboxThesholdTmp
      ) {
        this.isSubmit = true;
      } else {
        this.isSubmit = false;
      }
    },
    sel_project(value) {
      localStorage.setItem("current_pj", value);
      let sel_pj_id = this.projects.filter((x) =>
        x.name.toString().toLowerCase().includes(value.toLowerCase())
      )[0].id.id;
      FmconfApi.GetListScope(sel_pj_id)
        .then((response) => {
          this.listEnable.abox =
            response.find((o) => o.key === "A-Box").value == true ||
            response.find((o) => o.key === "A-Box").value == "true"
              ? true
              : false;
          this.listEnable.wbox =
            response.find((o) => o.key === "W-Box").value == true ||
            response.find((o) => o.key === "W-Box").value == "true"
              ? true
              : false;
          this.listEnable.vabox =
            response.find((o) => o.key === "VA-Box").value == true ||
            response.find((o) => o.key === "VA-Box").value == "true"
              ? true
              : false;
          this.listEnable.rbox =
            response.find((o) => o.key === "R-Box").value == true ||
            response.find((o) => o.key === "R-Box").value == "true"
              ? true
              : false;
          this.listEnable.thbox =
            response.find((o) => o.key === "TH-Box").value == true ||
            response.find((o) => o.key === "TH-Box").value == "true"
              ? true
              : false;

          if (this.listEnable.abox) {
            this.aboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_abox"
            ).value;
          }
          if (this.listEnable.wbox) {
            this.wboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_wbox"
            ).value;
          }
          if (this.listEnable.vabox) {
            this.vaboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_vabox"
            ).value;
          }
          if (this.listEnable.rbox) {
            this.rboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_rbox"
            ).value;
          }
          if (this.listEnable.thbox) {
            this.thboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_thbox"
            ).value;
          }

          this.aboxThesholdTmp = this.aboxThesholdCurrent;
          this.wboxThesholdTmp = this.wboxThesholdCurrent;
          this.vaboxThesholdTmp = this.vaboxThesholdCurrent;
          this.rboxThesholdTmp = this.rboxThesholdCurrent;
          this.thboxThesholdTmp = this.thboxThesholdCurrent;
        })
        .catch((err) => {
          console.log(err);
          const e = err.response.data;
          if (e.status == 401 && e.errorCode == 11) {
            this.$router.push("/alarmtheshold");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: e.message,
            });
            this.$router.push("/login");
          }
        });
    },
    projectId(newvalue, oldvalue) {
      this.sel_pj_id = newvalue;
      FmconfApi.GetListScope(this.sel_pj_id)
        .then((response) => {
          this.listEnable.abox =
            response.find((o) => o.key === "A-Box").value == true ||
            response.find((o) => o.key === "A-Box").value == "true"
              ? true
              : false;
          this.listEnable.wbox =
            response.find((o) => o.key === "W-Box").value == true ||
            response.find((o) => o.key === "W-Box").value == "true"
              ? true
              : false;
          this.listEnable.vabox =
            response.find((o) => o.key === "VA-Box").value == true ||
            response.find((o) => o.key === "VA-Box").value == "true"
              ? true
              : false;
          this.listEnable.rbox =
            response.find((o) => o.key === "R-Box").value == true ||
            response.find((o) => o.key === "R-Box").value == "true"
              ? true
              : false;
          this.listEnable.thbox =
            response.find((o) => o.key === "TH-Box").value == true ||
            response.find((o) => o.key === "TH-Box").value == "true"
              ? true
              : false;

          if (this.listEnable.abox) {
            this.aboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_abox"
            ).value;
          }
          if (this.listEnable.wbox) {
            this.wboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_wbox"
            ).value;
          }
          if (this.listEnable.vabox) {
            this.vaboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_vabox"
            ).value;
          }
          if (this.listEnable.rbox) {
            this.rboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_rbox"
            ).value;
          }
          if (this.listEnable.thbox) {
            this.thboxThesholdCurrent = response.find(
              (o) => o.key === "threshold_thbox"
            ).value;
          }

          this.aboxThesholdTmp = this.aboxThesholdCurrent;
          this.wboxThesholdTmp = this.wboxThesholdCurrent;
          this.vaboxThesholdTmp = this.vaboxThesholdCurrent;
          this.rboxThesholdTmp = this.rboxThesholdCurrent;
          this.thboxThesholdTmp = this.thboxThesholdCurrent;
        })
        .catch((err) => {
          console.log(err);
          const e = err.response.data;
          if (e.status == 401 && e.errorCode == 11) {
            this.$router.push("/alarmtheshold");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: e.message,
            });
            this.$router.push("/login");
          }
        });
    },
  },
  async created() {
    this.level = localStorage.getItem("level");
    this.sel_pj_id = this.projectId;
    FmconfApi.GetProjectList()
      .then((response) => {
        this.projects = response.data.filter(
          (x) => x.name != "INVENTORY" && x.name != "UNLIST"
        );
        this.sel_project =
          localStorage.getItem("current_pj") != null
            ? localStorage.getItem("current_pj")
            : this.projects[0].name;
        let sel_pj_id = this.projects.filter((x) =>
          x.name
            .toString()
            .toLowerCase()
            .includes(this.sel_project.toLowerCase())
        )[0].id.id;

        //console.log(sel_pj_id);
        FmconfApi.GetListScope(sel_pj_id)
          .then((res) => {
            this.listEnable.abox =
              res.find((o) => o.key === "A-Box").value == true ||
              res.find((o) => o.key === "A-Box").value == "true"
                ? true
                : false;
            this.listEnable.wbox =
              res.find((o) => o.key === "W-Box").value == true ||
              res.find((o) => o.key === "W-Box").value == "true"
                ? true
                : false;
            this.listEnable.vabox =
              res.find((o) => o.key === "VA-Box").value == true ||
              res.find((o) => o.key === "VA-Box").value == "true"
                ? true
                : false;
            this.listEnable.rbox =
              res.find((o) => o.key === "R-Box").value == true ||
              res.find((o) => o.key === "R-Box").value == "true"
                ? true
                : false;
            this.listEnable.thbox =
              res.find((o) => o.key === "TH-Box").value == true ||
              res.find((o) => o.key === "TH-Box").value == "true"
                ? true
                : false;

            this.aboxThesholdCurrent = res.find(
              (o) => o.key === "threshold_abox"
            ).value;
            this.wboxThesholdCurrent = res.find(
              (o) => o.key === "threshold_wbox"
            ).value;
            this.vaboxThesholdCurrent = res.find(
              (o) => o.key === "threshold_vabox"
            ).value;
            this.rboxThesholdCurrent = res.find(
              (o) => o.key === "threshold_rbox"
            ).value;
            this.thboxThesholdCurrent = res.find(
              (o) => o.key === "threshold_thbox"
            ).value;

            this.aboxThesholdTmp = this.aboxThesholdCurrent;
            this.wboxThesholdTmp = this.wboxThesholdCurrent;
            this.vaboxThesholdTmp = this.vaboxThesholdCurrent;
            this.rboxThesholdTmp = this.rboxThesholdCurrent;
            this.thboxThesholdTmp = this.thboxThesholdCurrent;
          })
          .catch((err) => {
            console.log(err);
            let e = err.response.data;
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
      })
      .catch((err) => {
        console.log(err);
        const e = err.response.data;
        if (e.status == 401 && e.errorCode == 11) {
          this.$router.push("/alarmtheshold");
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: e.message,
          });
          this.$router.push("/login");
        }
      });
  },
};
</script>
