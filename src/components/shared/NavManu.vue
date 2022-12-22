<template>
  <v-navigation-drawer floating color="#f8f8f8" absolute height="100%">
    <h5 class="h5-text mt-5 ml-4">MAIN MENU</h5>
    <v-list dense nav>
      <!-- <v-list-group prepend-icon="mdi-cog-box" title="FM Config" value="FM Config">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Project"></v-list-item>
        </template>
        <v-list-item title="FM Config" value="FM Config"></v-list-item>
        <v-list-item title="FM Config" value="FM Config"></v-list-item>
      </v-list-group> -->

      <v-list-group prepend-icon="mdi-archive" value="Project">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Project"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, val, link], i) in projects"
          :key="i"
          :value="val"
          :title="title"
          :to="link"
          link
        >
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-chip" value="Device Management">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Device Management"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, val, link], i) in deviceMgmt"
          :key="i"
          :value="val"
          :title="title"
          :to="link"
          link
        >
        </v-list-item>
      </v-list-group>

      <v-list-item
        title="Map Layout"
        value="Map Layout"
        prepend-icon="mdi-map"
        to="/mapinfo"
      ></v-list-item>

      <v-list-group
        prepend-icon="mdi-bag-checked"
        value="Device Inventory"
        v-if="level != 'user'"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Device Inventory"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, val, link], i) in inventory"
          :key="i"
          :value="val"
          :title="title"
          :to="link"
          link
        >
        </v-list-item>
      </v-list-group>

      <v-list-group
        prepend-icon="mdi-trash-can"
        value="Device Unlist"
        v-if="level != 'user'"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Device Unlist"></v-list-item>
        </template>
        <v-list-item
          v-for="([title, val, link], i) in unlist"
          :key="i"
          :value="val"
          :title="title"
          :to="link"
          link
        >
        </v-list-item>
      </v-list-group>

      <v-list-group
        prepend-icon="mdi-recycle-variant"
        value="Device Reuse"
        v-if="level != 'user'"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Device Reuse"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, val, link], i) in reuse"
          :key="i"
          :value="val"
          :title="title"
          :to="link"
          link
        >
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-cog-outline" value="FM Config">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="FM Config"></v-list-item>
        </template>
        <v-list-item
          v-for="([title, val, link], i) in fmconf"
          :key="i"
          :value="val"
          :title="title"
          :to="link"
          link
        >
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-file-document" value="Alarm Logs">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Alarm Logs"></v-list-item>
        </template>
        <v-list-item
          v-for="([title, val, link], i) in alarmlogs"
          :key="i"
          :value="val"
          :title="title"
          :to="link"
          link
        >
        </v-list-item>
      </v-list-group>

      <v-list-group
        prepend-icon="mdi-account-box-multiple"
        value="User Management"
        v-if="level != 'user'"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="User Management"></v-list-item>
        </template>
        <v-list-item
          v-for="([title, val, link], i) in usermgmt"
          :key="i"
          :value="val"
          :title="title"
          :to="link"
          link
        >
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- <v-card class="ma-4" style="bottom: 0px;position: absolute;">

      <v-card-text class="py-0 mb-4 mt-4">
        <div>CPU AVG</div>
        <v-row align="center" hide-gutters no-gutters>
          <v-col class="text-h6" cols="6">
            {{status.cpu}} %
          </v-col>
          <v-col cols="6" align="right">
            <v-img src="./../../assets/processor.png" contain height="35px" width="35px"></v-img>
          </v-col>
        </v-row>
      </v-card-text>


      <v-divider></v-divider>

      <v-card-text>
        <div>RAM</div>
        <v-row align="center" hide-gutters no-gutters>
          <v-col class="text-h7" cols="6">
             <span class="text-h6">{{status.ram.used}}</span> / {{status.ram.total}}
          </v-col>
          <v-col cols="6" align="right">
            <v-img src="./../../assets/ram.png" contain height="35px" width="35px"></v-img>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="4">
            <v-list-item exact-active-class="font-weight-black" two-line>
              <template v-slot:title>
                <p>total</p>
              </template>
              <template v-slot:subtitle>
                <p>{{status.ram.total}}</p>
              </template>
            </v-list-item>
          </v-col>
          <v-col cols="4">
            <v-list-item exact-active-class="font-weight-black" two-line>
              <template v-slot:title>
                <p>used</p>
              </template>
              <template v-slot:subtitle>
                <p>{{status.ram.used}}</p>
              </template>
            </v-list-item>
          </v-col>
          <v-col cols="4">
            <v-list-item exact-active-class="font-weight-black" two-line>
              <template v-slot:title>
                <p>free</p>
              </template>
              <template v-slot:subtitle>
                <p>{{status.ram.free}}</p>
              </template>
            </v-list-item>
          </v-col>
          <v-col cols="4">
            <v-list-item exact-active-class="font-weight-black" two-line>
              <template v-slot:title>
                <p>shared</p>
              </template>
              <template v-slot:subtitle>
                <p>{{status.ram.shared}}</p>
              </template>
            </v-list-item>
          </v-col>
          <v-col cols="4">
            <v-list-item exact-active-class="font-weight-black" two-line>
              <template v-slot:title>
                <p>cache</p>
              </template>
              <template v-slot:subtitle>
                <p>{{status.ram.cache}}</p>
              </template>
            </v-list-item>
          </v-col>
          <v-col cols="4">
            <v-list-item exact-active-class="font-weight-black" two-line>
              <template v-slot:title>
                <p>available</p>
              </template>
              <template v-slot:subtitle>
                <p>{{status.ram.available}}</p>
              </template>
            </v-list-item>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card> -->
  </v-navigation-drawer>
</template>

<script>
import ServerStatusApi from "../../services/ServerStatusApi";
export default {
  props: ["listEnable"],
  data() {
    return {
      level: "",
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
      cruds: [
        ["Create", "mdi-plus-outline"],
        ["Read", "mdi-file-outline"],
        ["Update", "mdi-update"],
        ["Delete", "mdi-delete"],
      ],
      projects: [
        ["Add New Project", "addProject", "/project/add"],
        ["Project List", "listProject", "/project/list"],
      ],
      deviceMgmt: [
        ["Summary", "Summary", "/deviceoverview"],
        ["Overview", "deviceOverview", "/device/overview"],
        ["A-Box", "deviceAbox", "/device/abox"],
        ["R-Box", "deviceRbox", "/device/rbox"],
        ["Device-Status", "deviceStatus", "/devicestatus"],
        ["Find-Device", "findDevice", "/finddevice"],
        ["Add / Import", "addImportDevice", "/adddevice"],
      ],
      inventory: [
        ["All", "inventory-all", "/inventory/all"],
        ["A-Box", "inventory-a-box", "/inventory/abox"],
        ["W-Box", "inventory-w-box", "/inventory/wbox"],
        ["TH-Box", "inventory-th-box", "/inventory/thbox"],
        ["VA-Box", "inventory-va-box", "/inventory/vabox"],
        ["R-Box", "inventory-r-box", "/inventory/rbox"],
      ],
      unlist: [
        ["All", "unlist-all", "/unlist/all"],
        ["A-Box", "unlist-a-box", "/unlist/abox"],
        ["W-Box", "unlist-w-box", "/unlist/wbox"],
        ["TH-Box", "unlist-th-box", "/unlist/thbox"],
        ["VA-Box", "unlist-va-box", "/unlist/vabox"],
        ["R-Box", "unlist-r-box", "/unlist/rbox"],
      ],
      reuse: [
        ["All", "reuse-all", "/reuse/all"],
        ["A-Box", "reuse-a-box", "/reuse/abox"],
        ["W-Box", "reuse-w-box", "/reuse/wbox"],
        ["TH-Box", "reuse-th-box", "/reuse/thbox"],
        ["VA-Box", "reuse-va-box", "/reuse/vabox"],
        ["R-Box", "reuse-r-box", "/reuse/rbox"],
      ],
      fmconf: [
        ["Alarm Theshold", "fmconf-all", "/alarmtheshold"],
        ["A-Box : Rule", "fmconf-a-box", "/conf/abox"],
        ["W-Box : Rule", "fmconf-w-box", "/conf/wbox"],
        ["TH-Box : Rule", "fmconf-th-box", "/conf/thbox"],
        ["VA-Box : Rule", "fmconf-va-box", "/conf/vabox"],
        ["R-Box : Rule", "fmconf-r-box", "/conf/rbox"],
      ],
      alarmlogs: [
        ["Device Alarm Logs", "deviceAlarmLog", "/alarmlog/device"],
        ["FM Alarm Logs", "fmAlarmLog", "/alarmlog/fm"],
      ],
      usermgmt: [
        ["Add / Import", "useradd", "/useradd"],
        ["User List", "userlist", "/userlist"],
        ["Activity Log", "logs", "/logs"],
      ],
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      right: null,
      interval: null,
      status: {
        cpu: null,
        ram: {
          total: null,
          used: null,
          free: null,
          shared: null,
          cache: null,
          available: null,
        },
      },
      props: null,
    };
  },
  methods: {
    GetServerStatus() {
      ServerStatusApi.ServerStatus()
        .then((response) => {
          this.status.cpu = response.avg_cpu_percentage;
          this.status.ram.total = response.ram_usage.total;
          this.status.ram.used = response.ram_usage.used;
          this.status.ram.free = response.ram_usage.free;
          this.status.ram.shared = response.ram_usage.shared;
          this.status.ram.cache = response.ram_usage.cache;
          this.status.ram.available = response.ram_usage.available;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AllowDeviceType() {},
  },
  watch: {
    props(val) {
      console.log(val);
    },
    listEnable: function (val) {
      var tmpDeviceMgmt = [];
      var tmpRule = [];

      if (val.abox) {
        tmpDeviceMgmt.push(["A-box", "deviceABox", "/device/abox"]);
        tmpRule.push(["A-Box : Rule", "fmconf-a-box", "/conf/abox"]);
      }
      if (val.wbox) {
        tmpDeviceMgmt.push(["W-box", "deviceWBox", "/device/wbox"]);
        tmpRule.push(["W-Box : Rule", "fmconf-w-box", "/conf/wbox"]);
      }
      if (val.vabox) {
        tmpDeviceMgmt.push(["VA-box", "deviceVABox", "/device/vabox"]);
        tmpRule.push(["VA-Box : Rule", "fmconf-va-box", "/conf/vabox"]);
      }
      if (val.rbox) {
        tmpDeviceMgmt.push(["R-box", "deviceRBox", "/device/rbox"]);
        tmpRule.push(["R-Box : Rule", "fmconf-r-box", "/conf/rbox"]);
      }
      if (val.thbox) {
        tmpDeviceMgmt.push(["TH-box", "deviceTHBox", "/device/thbox"]);
        tmpRule.push(["TH-Box : Rule", "fmconf-th-box", "/conf/thbox"]);
      }

      tmpRule.unshift(["Alarm Theshold", "fmconf-all", "/alarmtheshold"]);

      if (this.level != "user") {
        tmpDeviceMgmt.unshift(
          ["Summary", "Summary", "/deviceoverview"],
          ["Overview", "deviceOverview", "/device/overview"]
        );
        tmpDeviceMgmt.push(
          ["Device-Status", "deviceStatus", "/devicestatus"],
          ["Find-Device", "findDevice", "/finddevice"],
          ["Add / Import", "addImportDevice", "/adddevice"]
        );
      } else {
        tmpDeviceMgmt.unshift([
          "Overview",
          "deviceOverview",
          "/device/overview",
        ]);
        tmpDeviceMgmt.push(
          ["Device-Status", "deviceStatus", "/devicestatus"],
          ["Find-Device", "findDevice", "/finddevice"]
        );
      }

      this.deviceMgmt = tmpDeviceMgmt;
      this.fmconf = tmpRule;
    },
  },
  mounted() {
    this.level = localStorage.getItem("level");
    if (this.level == "superadmin") {
      this.projects = [
        ["Add New Project", "addProject", "/project/add"],
        ["Project List", "listProject", "/project/list"],
      ];
    } else {
      this.projects = [["Project List", "listProject", "/project/list"]];
    }
    // this.GetServerStatus()
    // this.interval = setInterval(() => {
    //   this.GetServerStatus();
    // }, 2500);
  },
};
</script>
<style scoped>
p {
  font-size: 0.8em;
}

.v-list-item-title {
  font-size: 0.5rem !important;
}
</style>
