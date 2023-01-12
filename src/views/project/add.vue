<template>
  <v-card class="mx-auto">
    <v-toolbar
      color="grey darken-4"
      style="background-color: rgb(72, 73, 71) !important"
    >
      <v-toolbar-title>
        <h6 class="text-h6" style="color: white">Add New Project</h6>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-row class="justify-center align-center">
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
            <v-checkbox v-model="editInfo.abox" label="A-Box" hide-details />
            <v-checkbox v-model="editInfo.wbox" label="W-Box" hide-details />
            <v-checkbox v-model="editInfo.vabox" label="VA-Box" hide-details />
            <v-checkbox v-model="editInfo.thbox" label="TH-Box" hide-details />
            <v-checkbox v-model="editInfo.rbox" label="R-Box" hide-details />
          </v-row>
        </v-col>

        <v-col cols="12" sm="4" class="text-right"> &nbsp; </v-col>
        <v-col cols="12" sm="6">
          <v-btn size="small" color="success" @click="saveEdit()">
            <span style="color:white;">Submit</span>
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
      defaultVale: {
        lost_period: 1440,
        offline_period: 720,
        ac_msg_abox: "AC Line Down",
        ac_msg_wbox: "AC Line Down",
        ac_msg_thbox: "AC Line Down",
        ac_msg_vabox: "AC Line Down",
        ac_msg_rbox: "AC Line Down",
        opt_msg_wbox: "Disconnect",
        hum_msg_thbox: "Humidity Problem",
        tmp_msg_thbox: "Temperature Problem",
        threshold_abox: 15,
        threshold_wbox: 15,
        threshold_thbox: 15,
        threshold_vabox: 15,
        threshold_rbox: 15,
        v_min: 200,
        v_max: 220,
        t_min: 20,
        t_max: 30,
        rh_min: 28,
        rh_max: 90,
        c_min: 20,
        c_max: 33,
        ac_abox_enable: 1,
        ac_wbox_enable: 1,
        ac_thbox_enable: 1,
        ac_vabox_enable: 1,
        ac_rbox_enable: 1,
        opt_enable: 1,
        cur_zero_enable: 1,
        cur_msg_wbox: "Current Equal Zero",
        temp_enable: 1,
        hum_enable: 1,
        volt_enable: 1,
        cur_enable: 1,
        eny_enable: 1,
        pow_enable: 1,
        volt_msg_vabox: "Volt Problem",
        cur_msg_vabox: "Current Problem",
        eny_msg_vabox: "Energy Problem",
        pow_msg_vabox: "Power Problem",
        tmi: 20,
        tmx: 30,
        hmi: 70,
        hmx: 90,
        vmi: 200,
        vmx: 220,
        cmi: 100,
        cmx: 1000,
        emi: 2000,
        emx: 5000,
        pmi: 1000,
        pmx: 5000,
        relay_enable: 1,
        relay_msg_rbox: "Relay Off",
        layout: "",
      },
      editInfo: {
        id: null,
        name: null,
        abox: null,
        wbox: null,
        vabox: null,
        thbox: null,
        rbox: null,
      },
    };
  },
  methods: {
    saveEdit() {
      let _nameChangePayload = {};
      _nameChangePayload.title = this.editInfo.name;

      // Change Name
      ProjectApi.SetNameProject(_nameChangePayload)
        .then((response) => {
          this.editInfo.id = response.id.id;

          // Set DeviceType
          let _deviceType = {};
          _deviceType["A-Box"] = this.editInfo.abox ? "true" : "";
          _deviceType["W-Box"] = this.editInfo.wbox ? "true" : "";
          _deviceType["TH-Box"] = this.editInfo.thbox ? "true" : "";
          _deviceType["VA-Box"] = this.editInfo.vabox ? "true" : "";
          _deviceType["R-Box"] = this.editInfo.rbox ? "true" : "";
          _deviceType.lastUpdate = Math.floor(Date.now()).toString();
          Object.assign(_deviceType, this.defaultVale);
          ProjectApi.SetServerScope(this.editInfo.id, _deviceType).then();
          ProjectApi.PhpMakePojectPublic(this.editInfo.id).then();
          
          this.$swal.fire({
            icon: "success",
            title: "Success!",
            text: "Complete",
          });
          
          this.$router.push("/project/list");
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
    processAddProject() {
      // 1 Add Project http://182.52.50.211:18080/api/customer [POST]
      // { "title": "ApiAddPJ" }
      // { // RESPONSE
      // "id": {
      //     "entityType": "CUSTOMER",
      //     "id": "e9dca3d0-779f-11ed-a2c8-b55147006237"
      // },
      // "createdTime": 1670576422541,
      // "additionalInfo": null,
      // "country": null,
      // "state": null,
      // "city": null,
      // "address": null,
      // "address2": null,
      // "zip": null,
      // "phone": null,
      // "email": null,
      // "title": "ApiAddPJ",
      // "tenantId": {
      //     "entityType": "TENANT",
      //     "id": "41d038d0-20a1-11ea-a25f-9d921071e357"
      // },
      // "name": "ApiAddPJ"
      // }
      // 2 http://182.52.50.211:18080/api/dashboard [POST]
      // {projectdashboard}
      // 3 Make Public http://61.19.18.116:7077/data/pages/make_public.php?project_id=e9dca3d0-779f-11ed-a2c8-b55147006237 [POST] {custommer_id}
      // 4 http://182.52.50.211:18080/api/dashboard/e9f77ed0-779f-11ed-a2c8-b55147006237/customers [POST] {custommerid}
      // ["e9dca3d0-779f-11ed-a2c8-b55147006237"]
      // 5 Add Server Scope http://182.52.50.211:18080/api/plugins/telemetry/CUSTOMER/e9dca3d0-779f-11ed-a2c8-b55147006237/SERVER_SCOPE
      // {
      //     "A-Box": "true",
      //     "W-Box": "true",
      //     "TH-Box": "true",
      //     "VA-Box": "true",
      //     "R-Box": "true",
      //     "map-url": "http://182.52.50.211:18080/dashboards/e9f77ed0-779f-11ed-a2c8-b55147006237?publicId=e9dca3d0-779f-11ed-a2c8-b55147006237",
      //     "lastUpdate": "1670576422815",
      //     "lastUpdateuser": "mvc@mvc.com",
      //     "usercreate": "mvc@mvc.com",
      //     "lost_period": 1440,
      //     "offline_period": 720,
      //     "ac_msg_abox": "AC Line Down",
      //     "ac_msg_wbox": "AC Line Down",
      //     "ac_msg_thbox": "AC Line Down",
      //     "ac_msg_vabox": "AC Line Down",
      //     "ac_msg_rbox": "AC Line Down",
      //     "opt_msg_wbox": "Disconnect",
      //     "hum_msg_thbox": "Humidity Problem",
      //     "tmp_msg_thbox": "Temperature Problem",
      //     "threshold_abox": 15,
      //     "threshold_wbox": 15,
      //     "threshold_thbox": 15,
      //     "threshold_vabox": 15,
      //     "threshold_rbox": 15,
      //     "v_min": 200,
      //     "v_max": 220,
      //     "t_min": 20,
      //     "t_max": 30,
      //     "rh_min": 28,
      //     "rh_max": 90,
      //     "c_min": 20,
      //     "c_max": 33,
      //     "ac_abox_enable": 1,
      //     "ac_wbox_enable": 1,
      //     "ac_thbox_enable": 1,
      //     "ac_vabox_enable": 1,
      //     "ac_rbox_enable": 1,
      //     "opt_enable": 1,
      //     "cur_zero_enable": 1,
      //     "cur_msg_wbox": "Current Equal Zero",
      //     "temp_enable": 1,
      //     "hum_enable": 1,
      //     "volt_enable": 1,
      //     "cur_enable": 1,
      //     "eny_enable": 1,
      //     "pow_enable": 1,
      //     "volt_msg_vabox": "Volt Problem",
      //     "cur_msg_vabox": "Current Problem",
      //     "eny_msg_vabox": "Energy Problem",
      //     "pow_msg_vabox": "Power Problem",
      //     "tmi": 20,
      //     "tmx": 30,
      //     "hmi": 70,
      //     "hmx": 90,
      //     "vmi": 200,
      //     "vmx": 220,
      //     "cmi": 100,
      //     "cmx": 1000,
      //     "emi": 2000,
      //     "emx": 5000,
      //     "pmi": 1000,
      //     "pmx": 5000,
      //     "relay_enable": 1,
      //     "relay_msg_rbox": "Relay Off",
      //     "layout": ""
      // }
    },
  },
};
</script>
