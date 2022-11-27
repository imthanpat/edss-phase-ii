<template>
  <v-app>
    <v-app-bar app color="#484947">
      <v-list-item exact-active-class="font-weight-black" two-line
        prepend-avatar="http://119.31.121.151/assets/img/aisnotext.svg">
        <template v-slot:title>
          <h5 class="text-h6" style="color:white">Enterprise Data Service</h5>
        </template>

        <template v-slot:subtitle>
          <p class="text-p" style="color:white">IoT Operation Platform</p>
        </template>

      </v-list-item>
      <v-spacer></v-spacer>
      <v-icon color="white" style="font-size: 36px;"> mdi-server-network </v-icon>
      <v-list-item exact-active-class="font-weight-black" two-line>
        <template v-slot:title>
          <v-badge color="success" content="Online" inline class="pl-0"></v-badge>
        </template>
        <template v-slot:subtitle>
          <subtitle style="color:white">FM Status</subtitle>
        </template>
      </v-list-item>
      <v-icon color="white" style="font-size: 36px;"> mdi-chip </v-icon>
      <v-list-item exact-active-class="font-weight-black" two-line>
        <template v-slot:title>
          <header style="color:white">{{ status.cpu }} %</header>
        </template>
        <template v-slot:subtitle>
          <subtitle style="color:white">CPU AVG</subtitle>
        </template>
      </v-list-item>
      <v-icon color="white" style="font-size: 36px;"> mdi-memory </v-icon>
      <v-list-item exact-active-class="font-weight-black" two-line>
        <template v-slot:title>
          <header style="color:white">{{ status.ram.used }} / {{ status.ram.total }}</header>
        </template>
        <template v-slot:subtitle>
          <subtitle style="color:white">RAM</subtitle>
        </template>
      </v-list-item>
      <v-icon color="white" style="font-size: 36px;"> mdi-nas </v-icon>
      <v-list-item exact-active-class="font-weight-black" two-line>
        <template v-slot:title>
          <header style="color:white">{{ status.disk_used }} / {{ status.disk_total }}</header>
        </template>
        <template v-slot:subtitle>
          <subtitle style="color:white">DISK</subtitle>
        </template>
      </v-list-item>
      <!-- <v-list-item exact-active-class="font-weight-black" two-line
        prepend-avatar="http://119.31.121.151/assets/content/admin2.png">
        <template v-slot:title>
          <header style="color:white">dev@edss.com</header>
        </template>

        <template v-slot:subtitle>
          <subtitle style="color:white">dev</subtitle>
        </template>

      </v-list-item> -->

      <v-btn @click="logout" icon style="color:white">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-app-bar>

    <NavManu :listEnable.sync="listEnable" app />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application thge proper gutter -->
      <v-container fluid>
        <v-app-bar class="ma-2 pl-4 pr-4" style="width: -webkit-fill-available!important;border-radius: 5px;" color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
          <template v-slot:image>
            <v-img gradient="to top right, rgba(65, 65, 65, 0.8), rgba(65, 65, 65, 0.8)"></v-img>
          </template>

          <template v-slot:prepend>
            <h6 class="text-subtitle-2">Select A Project</h6>
          </template>

          <v-app-bar-title>
            <v-combobox v-model="sel_project" :items="projects" item-text="name" item-value="id.id" @change="searchPj"
              class="pa-2" filled rounded></v-combobox>
          </v-app-bar-title>
        </v-app-bar>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app color="#f8f8f8">
      <h5 class="h2-text">IOT Platform © Copyright 2022. All Rights Reserved.</h5>
    </v-footer>
  </v-app>
</template>
  
<script>
import NavManu from "../components/shared/NavManu";
import AppBar from "../components/shared/AppBar";
import ServerStatusApi from '../services/ServerStatusApi';
import ProjectApi from '../services/ProjectApi'
import {mapActions} from 'vuex'

export default {
  name: "default",
  components: {
    NavManu,
    AppBar,
    NavManu
  },
  computed: {
    projectId() {
      return this.$store.state.project.projectId;
    },
  },
  data() {
    return {
      status: {
        cpu: null,
        ram: {
          total: null,
          used: null,
          free: null,
          shared: null,
          cache: null,
          available: null
        },
        disk_used: null,
        disk_total: null,
        fm_status: null
      },
      sel_project: "",
      projects: [],
      listEnable: {
        abox: false,
        wbox: false,
        vabox: false,
        rbox: false,
        thbox: false
      },
      sendListEnable: "00000"
    }
  },
  watch: {
    sel_project(value) {
      localStorage.setItem('current_pj', value);
      let sel_pj_id = this.projects.filter((x) =>
        x.name.toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      )[0].id.id;

      // Set Vuex
      this.setProjectId(sel_pj_id);

      ProjectApi.GetListScope(sel_pj_id)
        .then(response => {
          var tmpListEnablle = {};
          tmpListEnablle.abox = (response.find(o => o.key === 'A-Box').value == true) || (response.find(o => o.key === 'A-Box').value == "true") ? true : false;
          tmpListEnablle.wbox = (response.find(o => o.key === 'W-Box').value == true) || (response.find(o => o.key === 'W-Box').value == "true") ? true : false;
          tmpListEnablle.vabox = (response.find(o => o.key === 'VA-Box').value == true) || (response.find(o => o.key === 'VA-Box').value == "true") ? true : false;
          tmpListEnablle.rbox = (response.find(o => o.key === 'R-Box').value == true) || (response.find(o => o.key === 'R-Box').value == "true") ? true : false;
          tmpListEnablle.thbox = (response.find(o => o.key === 'TH-Box').value == true) || (response.find(o => o.key === 'TH-Box').value == "true") ? true : false;
          this.listEnable = tmpListEnablle;
          //console.log(this.listEnable);
          // if (this.listEnable.abox) { this.aboxThesholdCurrent = response.find(o => o.key === 'threshold_abox').value; }
          // if (this.listEnable.wbox) { this.wboxThesholdCurrent = response.find(o => o.key === 'threshold_wbox').value; }
          // if (this.listEnable.vabox) { this.vaboxThesholdCurrent = response.find(o => o.key === 'threshold_vabox').value; }
          // if (this.listEnable.rbox) { this.rboxThesholdCurrent = response.find(o => o.key === 'threshold_rbox').value; }
          // if (this.listEnable.thbox) { this.thboxThesholdCurrent = response.find(o => o.key === 'threshold_thbox').value; }

          // this.aboxThesholdTmp = this.aboxThesholdCurrent;
          // this.wboxThesholdTmp = this.wboxThesholdCurrent;
          // this.vaboxThesholdTmp = this.vaboxThesholdCurrent;
          // this.rboxThesholdTmp = this.rboxThesholdCurrent;
          // this.thboxThesholdTmp = this.thboxThesholdCurrent;
        })
        .catch(err => {
          console.log(err);
          const e = err.response.data;
          if ((e.status == 401) && (e.errorCode == 11)) {
            this.$swal.fire({
              icon: 'error',
              title: 'Error',
              text: e.message
            })
            this.$router.push('/login');
          }
        })
    }
  },
  methods: {
    ...mapActions({
      setProjectId: 'project/setProjectId'
    }),
    LocalSetProject(val){
      this.setProjectId(val);
    },
    GetServerStatus() {
      ServerStatusApi.ServerStatus()
        .then(response => {
          this.status.cpu = response.avg_cpu_percentage;
          this.status.ram.total = response.ram_usage.total;
          this.status.ram.used = response.ram_usage.used;
          this.status.ram.free = response.ram_usage.free;
          this.status.ram.shared = response.ram_usage.shared;
          this.status.ram.cache = response.ram_usage.cache;
          this.status.ram.available = response.ram_usage.available;
          this.status.disk_used = response.disk_used;
          this.status.disk_total = response.disk_total;
          this.status.fm_status = response.fm_avaliable ? "Online" : "Offline";
        })
        .catch(error => {
          console.log(error);
        })
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('current_pj');
      this.$router.push('/login');
    }
  },
  mounted() {
    this.GetServerStatus()
    this.interval = setInterval(() => {
      this.GetServerStatus();
    }, 2500);

    // Select Project
    ProjectApi.GetProjectList()
      .then(response => {
        this.projects = response.data.filter(x => x.name != "INVENTORY" && x.name != "UNLIST" && x.name != "REUSE");
        this.sel_project = localStorage.getItem('current_pj') != null ? localStorage.getItem('current_pj') : this.projects[0].name;
        let sel_pj_id = this.projects.filter((x) =>
          x.name.toString()
            .toLowerCase()
            .includes(this.sel_project.toLowerCase())
        )[0].id.id;

        if(this.projectId == ''){ this.setProjectId(sel_pj_id); }
      })
      .catch(err => {
        console.log(err);
        const e = err.response.data;
        if ((e.status == 401) && (e.errorCode == 11)) {
          this.$swal.fire({
            icon: 'error',
            title: 'Error',
            text: e.message
          })
          this.$router.push('/login');
        }
      })
  }
};
</script>