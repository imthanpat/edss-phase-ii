<template>
  <EasyDataTable
    class="ma-2"
    :rows-items="[10, 25, 50, 100]"
    :headers="headers"
    :items="items"
    buttons-pagination
  >
    <template #item-type="item">
      <v-chip
        v-if="item.type != ''"
        size="small"
        class="ma-2"
        variant="outlined"
        label
        >{{ item.type }}</v-chip
      >
    </template>

    <template #item-condition="item">
      <strong>{{ item.condition }}</strong>
    </template>

    <template #item-alarm_msg="item">
      <v-chip size="small">"{{ item.alarm_msg }}"</v-chip>
    </template>

    <template #item-alarm_enable="item">
      <v-checkbox v-model="item.alarm_enable" hide-details />
    </template>

    <template #item-action="item">
      <v-btn size="small" icon="mdi-pencil" @click="edit(item)" v-if="level != 'user'"></v-btn>
    </template>
  </EasyDataTable>

  <v-dialog max-width="800px" v-model="isActive">
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="rgb(72, 73, 71)" style="color:white;" title="Alarm Configuration">
          <v-spacer></v-spacer>
          <v-btn style="color: white" icon @click="isActive.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mb-5">
          <v-row class="justify-center align-center">
            <v-col cols="12" sm="4" class="text-right">
              <span class="text-overline">Device Type</span>
            </v-col>
            <v-col cols="12" sm="6">
              <v-chip size="small" variant="outlined" label>"{{ editInfo.type }}"</v-chip>
            </v-col>

            <v-col cols="12" sm="4" class="text-right">
              <span class="text-overline">Condition</span>
            </v-col>
            <v-col cols="12" sm="6">
              <v-chip size="small">"{{ editInfo.condition }}"</v-chip>
            </v-col>

            <v-col cols="12" sm="4" class="text-right">
              <span class="text-overline">Alarm Message<span style="color:red;">*</span></span>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                hide-details="true"
                v-model="editInfo.msg"
                label="Alarm Message*"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" class="text-right">
              <span class="text-overline">Enable/Disable<span style="color:red;">*</span></span>
            </v-col>
            <v-col cols="12" sm="6">
              <v-checkbox hide-details="true" v-model="editInfo.enable"></v-checkbox>
            </v-col>

            <v-col cols="12" sm="4" class="text-right">
              &nbsp;
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                size="small"
                color="success"
                :disabled="disableSave"
                @click="saveEdit()"
              >
                submit
              </v-btn>
              <v-btn size="small" class="ml-4" @click="resetEdit()"> Reset </v-btn>
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
export default {
  components: {
    EasyDataTable,
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
    $route(newvalue, oldvalue) {
      this.loadInfo(this.projectId);
    },
    editInfo: {
      handler(newVal, oldVal) {
        //this.disableEditSave = JSON.parse(JSON.stringify({...newVal})).toString() === JSON.parse(this.tmpEditModel).toString() ? false : true;
        this.disableSave =
          JSON.stringify({ ...newVal }) === this.tmpEditInfo;
        //console.log(this.disableEditSave);
      },
      deep: true,
    },

  },
  methods: {
    saveEdit(){
      let _payload = {};
      this.editInfo.data.enable.val = this.editInfo.enable;
      this.editInfo.data.msg.val = this.editInfo.msg;

      _payload[this.editInfo.data.enable.key] = this.editInfo.data.enable.val;
      _payload[this.editInfo.data.msg.key] = this.editInfo.data.msg.val;

      //SetListScope
      ProjectApi.SetListScope(this.projectId, _payload).then((_res) => {
        this.$swal.fire({
          icon: "success",
          title: "Success!",
          text: "Complete",
        });
        this.isActive = false;
        this.loadInfo(this.projectId);
      }).catch((_err) => {});
    },
    resetEdit(){
      this.editInfo = JSON.parse(this.tmpEditInfo);
    },
    edit(item) {
      this.editInfo.type = this.$route.params.types.toUpperCase();
      this.editInfo.condition = item.condition;
      this.editInfo.msg = item.msg.val;
      this.editInfo.enable = item.enable.val == "1" ? true : false;

      this.editInfo.data.enable = item.enable;
      this.editInfo.data.msg = item.msg;

      this.tmpEditInfo = JSON.stringify({ ...this.editInfo });
      this.isActive = true;
    },
    loadInfo(currentProjectId) {
      this.items = [];
      ProjectApi.GetListScope(currentProjectId).then((_res) => {
        let aboxEnable =
          _res.find((o) => o.key === "A-Box").value == true ||
          _res.find((o) => o.key === "A-Box").value == "true"
            ? true
            : false;
        let wboxEnable =
          _res.find((o) => o.key === "W-Box").value == true ||
          _res.find((o) => o.key === "W-Box").value == "true"
            ? true
            : false;
        let vaboxEnable =
          _res.find((o) => o.key === "VA-Box").value == true ||
          _res.find((o) => o.key === "VA-Box").value == "true"
            ? true
            : false;
        let rboxEnable =
          _res.find((o) => o.key === "R-Box").value == true ||
          _res.find((o) => o.key === "R-Box").value == "true"
            ? true
            : false;
        let thboxEnable =
          _res.find((o) => o.key === "TH-Box").value == true ||
          _res.find((o) => o.key === "TH-Box").value == "true"
            ? true
            : false;

        let route_type = {};
        let _enable = {};
        let _msg = {};
        switch (this.$route.params.types) {
          case "abox":
            route_type.abox = true;
            break;
          case "wbox":
            route_type.wbox = true;
            break;
          case "thbox":
            route_type.thbox = true;
            break;
          case "vabox":
            route_type.vabox = true;
            break;
          case "rbox":
            route_type.rbox = true;
            break;
        }

        if (aboxEnable && route_type.abox) {
          let _row = {};
          _row.type = "A-Box";
          _row.condition = "AC-Line-Down";
          _row.alarm_msg = _res.find((o) => o.key === "ac_msg_abox").value;
          _row.alarm_enable =
            _res.find((o) => o.key === "ac_abox_enable").value == "1"
              ? true
              : false;
          _row.modifyby = "";
          _row.last_update = _res.find(
            (o) => o.key === "ac_msg_abox"
          ).lastUpdateTs;
          _row.last_update = new Date(
            parseInt(_row.last_update)
          ).toLocaleString();
          _row.action = "";

          _enable = {};
          _enable.key = "ac_abox_enable";
          _enable.val = _row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "ac_msg_abox";
          _msg.val = _row.alarm_msg;

          _row.enable = _enable;
          _row.msg = _msg;

          this.items.push(_row);
        }

        if (rboxEnable && route_type.rbox) {
          let _row = {};
          _row.type = "R-Box";
          _row.condition = "AC-Line-Down";
          _row.alarm_msg = _res.find((o) => o.key === "ac_msg_rbox").value;
          _row.alarm_enable =
            _res.find((o) => o.key === "ac_rbox_enable").value == "1"
              ? true
              : false;
          _row.modifyby = "";
          _row.last_update = _res.find(
            (o) => o.key === "ac_msg_rbox"
          ).lastUpdateTs;
          _row.last_update = new Date(
            parseInt(_row.last_update)
          ).toLocaleString();
          _row.action = "";

          _enable = {};
          _enable.key = "ac_rbox_enable";
          _enable.val = _row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "ac_msg_rbox";
          _msg.val = _row.alarm_msg;

          _row.enable = _enable;
          _row.msg = _msg;

          let __row = {};
          __row.type = "";
          __row.condition = "Relay Off";
          __row.alarm_msg = _res.find((o) => o.key === "relay_msg_rbox").value;
          __row.alarm_enable =
            _res.find((o) => o.key === "relay_enable").value == "1"
              ? true
              : false;
          __row.modifyby = "";
          __row.last_update = _res.find(
            (o) => o.key === "relay_msg_rbox"
          ).lastUpdateTs;
          __row.last_update = new Date(
            parseInt(__row.last_update)
          ).toLocaleString();
          __row.action = "";

          _enable = {};
          _enable.key = "relay_enable";
          _enable.val = __row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "relay_msg_rbox";
          _msg.val = __row.alarm_msg;

          __row.enable = _enable;
          __row.msg = _msg;

          this.items.push(_row);
          this.items.push(__row);
        }

        if (wboxEnable && route_type.wbox) {
          let _row = {};
          _row.type = "W-Box";
          _row.condition = "AC-Line-Down";
          _row.alarm_msg = _res.find((o) => o.key === "ac_msg_wbox").value;
          _row.alarm_enable =
            _res.find((o) => o.key === "ac_wbox_enable").value == "1"
              ? true
              : false;
          _row.modifyby = "";
          _row.last_update = _res.find(
            (o) => o.key === "ac_msg_wbox"
          ).lastUpdateTs;
          _row.last_update = new Date(
            parseInt(_row.last_update)
          ).toLocaleString();
          _row.action = "";

          _enable = {};
          _enable.key = "ac_wbox_enable";
          _enable.val = _row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "ac_msg_wbox";
          _msg.val = _row.alarm_msg;

          _row.enable = _enable;
          _row.msg = _msg;

          let __row = {};
          __row.type = "";
          __row.condition = "Current-Equal-Zero";
          __row.alarm_msg = _res.find((o) => o.key === "cur_msg_wbox").value;
          __row.alarm_enable =
            _res.find((o) => o.key === "cur_zero_enable").value == "1"
              ? true
              : false;
          __row.modifyby = "";
          __row.last_update = _res.find(
            (o) => o.key === "cur_msg_wbox"
          ).lastUpdateTs;
          __row.last_update = new Date(
            parseInt(__row.last_update)
          ).toLocaleString();
          __row.action = "";

          _enable = {};
          _enable.key = "cur_zero_enable";
          _enable.val = __row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "cur_msg_wbox";
          _msg.val = __row.alarm_msg;

          __row.enable = _enable;
          __row.msg = _msg;

          let ___row = {};
          ___row.type = "";
          ___row.condition = "Optical-Disconnect";
          ___row.alarm_msg = _res.find((o) => o.key === "opt_msg_wbox").value;
          ___row.alarm_enable =
            _res.find((o) => o.key === "opt_enable").value == "1"
              ? true
              : false;
          ___row.modifyby = "";
          ___row.last_update = _res.find(
            (o) => o.key === "opt_msg_wbox"
          ).lastUpdateTs;
          ___row.last_update = new Date(
            parseInt(___row.last_update)
          ).toLocaleString();
          ___row.action = "";

          _enable = {};
          _enable.key = "opt_enable";
          _enable.val = ___row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "opt_msg_wbox";
          _msg.val = ___row.alarm_msg;

          ___row.enable = _enable;
          ___row.msg = _msg;

          this.items.push(_row);
          this.items.push(__row);
          this.items.push(___row);
        }

        if (thboxEnable && route_type.thbox) {
          let _row = {};
          _row.type = "TH-Box";
          _row.condition = "AC-Line-Down";
          _row.alarm_msg = _res.find((o) => o.key === "ac_msg_thbox").value;
          _row.alarm_enable =
            _res.find((o) => o.key === "ac_thbox_enable").value == "1"
              ? true
              : false;
          _row.modifyby = "";
          _row.last_update = _res.find(
            (o) => o.key === "ac_msg_thbox"
          ).lastUpdateTs;
          _row.last_update = new Date(
            parseInt(_row.last_update)
          ).toLocaleString();
          _row.action = "";

          _enable = {};
          _enable.key = "ac_thbox_enable";
          _enable.val = _row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "ac_msg_thbox";
          _msg.val = _row.alarm_msg;

          _row.enable = _enable;
          _row.msg = _msg;

          let __row = {};
          __row.type = "";
          __row.condition = "Humidity-Problem";
          __row.alarm_msg = _res.find((o) => o.key === "hum_msg_thbox").value;
          __row.alarm_enable =
            _res.find((o) => o.key === "hum_enable").value == "1"
              ? true
              : false;
          __row.modifyby = "";
          __row.last_update = _res.find(
            (o) => o.key === "hum_msg_thbox"
          ).lastUpdateTs;
          __row.last_update = new Date(
            parseInt(__row.last_update)
          ).toLocaleString();
          __row.action = "";

          _enable = {};
          _enable.key = "hum_enable";
          _enable.val = __row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "hum_msg_thbox";
          _msg.val = __row.alarm_msg;

          __row.enable = _enable;
          __row.msg = _msg;

          let ___row = {};
          ___row.type = "";
          ___row.condition = "Temperature-Problem";
          ___row.alarm_msg = _res.find((o) => o.key === "tmp_msg_thbox").value;
          ___row.alarm_enable =
            _res.find((o) => o.key === "temp_enable").value == "1"
              ? true
              : false;
          ___row.modifyby = "";
          ___row.last_update = _res.find(
            (o) => o.key === "tmp_msg_thbox"
          ).lastUpdateTs;
          ___row.last_update = new Date(
            parseInt(___row.last_update)
          ).toLocaleString();
          _row.action = "";

          _enable = {};
          _enable.key = "temp_enable";
          _enable.val = ___row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "tmp_msg_thbox";
          _msg.val = ___row.alarm_msg;

          ___row.enable = _enable;
          ___row.msg = _msg;

          this.items.push(_row);
          this.items.push(__row);
          this.items.push(___row);
        }

        if (vaboxEnable && route_type.vabox) {
          let _row = {};
          _row.type = "VA-Box";
          _row.condition = "AC-Line-Down";
          _row.alarm_msg = _res.find((o) => o.key === "ac_msg_vabox").value;
          _row.alarm_enable =
            _res.find((o) => o.key === "ac_vabox_enable").value == "1"
              ? true
              : false;
          _row.modifyby = "";
          _row.last_update = _res.find(
            (o) => o.key === "ac_msg_vabox"
          ).lastUpdateTs;
          _row.last_update = new Date(
            parseInt(_row.last_update)
          ).toLocaleString();
          _row.action = "";

          _enable = {};
          _enable.key = "ac_vabox_enable";
          _enable.val = _row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "ac_msg_vabox";
          _msg.val = _row.alarm_msg;

          _row.enable = _enable;
          _row.msg = _msg;

          let __row = {};
          __row.type = "";
          __row.condition = "Power-Problem";
          __row.alarm_msg = _res.find((o) => o.key === "pow_msg_vabox").value;
          __row.alarm_enable =
            _res.find((o) => o.key === "pow_enable").value == "1"
              ? true
              : false;
          __row.modifyby = "";
          __row.last_update = _res.find(
            (o) => o.key === "pow_msg_vabox"
          ).lastUpdateTs;
          __row.last_update = new Date(
            parseInt(__row.last_update)
          ).toLocaleString();
          __row.action = "";

          _enable = {};
          _enable.key = "pow_enable";
          _enable.val = __row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "pow_msg_vabox";
          _msg.val = __row.alarm_msg;

          __row.enable = _enable;
          __row.msg = _msg;

          let ___row = {};
          ___row.type = "";
          ___row.condition = "Energy-Problem";
          ___row.alarm_msg = _res.find((o) => o.key === "eny_msg_vabox").value;
          ___row.alarm_enable =
            _res.find((o) => o.key === "eny_enable").value == "1"
              ? true
              : false;
          ___row.modifyby = "";
          ___row.last_update = _res.find(
            (o) => o.key === "eny_msg_vabox"
          ).lastUpdateTs;
          ___row.last_update = new Date(
            parseInt(___row.last_update)
          ).toLocaleString();
          ___row.action = "";

          _enable = {};
          _enable.key = "eny_enable";
          _enable.val = ___row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "eny_msg_vabox";
          _msg.val = ___row.alarm_msg;

          ___row.enable = _enable;
          ___row.msg = _msg;

          let ____row = {};
          ____row.type = "";
          ____row.condition = "Current-Problem";
          ____row.alarm_msg = _res.find((o) => o.key === "cur_msg_vabox").value;
          ____row.alarm_enable =
            _res.find((o) => o.key === "cur_enable").value == "1"
              ? true
              : false;
          ____row.modifyby = "";
          ____row.last_update = _res.find(
            (o) => o.key === "cur_msg_vabox"
          ).lastUpdateTs;
          ____row.last_update = new Date(
            parseInt(___row.last_update)
          ).toLocaleString();
          ____row.action = "";

          _enable = {};
          _enable.key = "cur_enable";
          _enable.val = ____row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "cur_msg_vabox";
          _msg.val = ____row.alarm_msg;

          ____row.enable = _enable;
          ____row.msg = _msg;

          let _____row = {};
          _____row.type = "";
          _____row.condition = "Volt-Problem";
          _____row.alarm_msg = _res.find(
            (o) => o.key === "volt_msg_vabox"
          ).value;
          _____row.alarm_enable =
            _res.find((o) => o.key === "volt_enable").value == "1"
              ? true
              : false;
          _____row.modifyby = "";
          _____row.last_update = _res.find(
            (o) => o.key === "volt_msg_vabox"
          ).lastUpdateTs;
          _____row.last_update = new Date(
            parseInt(___row.last_update)
          ).toLocaleString();
          _____row.action = "";

          _enable = {};
          _enable.key = "volt_enable";
          _enable.val = _____row.alarm_enable ? "1" : "0";

          _msg = {};
          _msg.key = "volt_msg_vabox";
          _msg.val = _____row.alarm_msg;

          _____row.enable = _enable;
          _____row.msg = _msg;

          this.items.push(_row);
          this.items.push(__row);
          this.items.push(___row);
          this.items.push(____row);
          this.items.push(_____row);
        }
      });
    },
  },
  data() {
    return {
      level: "",
      disableSave: true,
      isActive: false,
      headers: [
        { text: "Device Type", value: "type" },
        { text: "Condition", value: "condition" },
        { text: "Alarm Message", value: "alarm_msg" },
        { text: "Enable/Disable", value: "alarm_enable" },
        { text: "Modify By", value: "modifyby" },
        { text: "Last Update", value: "last_update" },
        { text: "Action", value: "action" },
      ],
      items: [],
      tmpEditInfo: null,
      editInfo: {
        type: "",
        condition: "",
        msg: "",
        enable: false,
        data: {
          enable: null,
          msg: null
        }
      }
    };
  },
  mounted() {
    this.level = localStorage.getItem('level');
    this.loadInfo(this.projectId);
  },
};
</script>
