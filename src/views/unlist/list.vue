<template>
    <p class="text-left mt-2 mb-2"><span class="text-subtitle-2">Debugs : </span><v-chip size="small">{{projectId}}</v-chip></p>
    <p class="text-left mt-2 mb-2"><span class="text-subtitle-2">Total Device(s) : </span><v-chip size="small">{{serverItemsLength}}</v-chip></p>
   <EasyDataTable style="overflow: hidden;text-overflow: ellipsis;" :rows-items=[10,25,50,100]
     v-model:server-options="serverOptions" :server-items-length="serverItemsLength" :loading="serveSideloading"
     :headers="headers" :items="items" buttons-pagination>
     <template #item-status="item">
       <v-chip v-if="item.last_update != 'Invalid Date'" size="small" class="ma-2" color="success" label>Ready To Implement</v-chip>
       <v-chip v-if="item.last_update == 'Invalid Date'" size="small" class="ma-2" color="warning" label>New</v-chip>
     </template>
     <template #item-sensor="item">
        <v-icon icon="mdi-flash"></v-icon>
        <v-icon v-if="item.type == 'R-Box'" icon="mdi-lightbulb"></v-icon>
    </template>
    <template #item-type="item">
      <v-chip size="small"  class="ma-2" variant="outlined" label>{{item.type}}</v-chip>
    </template>
     <template #item-action="item">
       <v-btn class="sm-btn" variant="text" icon="mdi-arrow-right-bold-circle-outline" @click="moveBtnClick(item)"></v-btn>
     </template>
   </EasyDataTable>
   <GDialog v-model="dialogState" max-width="300" scrollable>
    <div class="dialog" style="width: inherit;">
      <v-text-field label="Filter Project"  v-model="searchMovePj"></v-text-field>
      <div class="content">
          <EasyDataTable :headers="headers_move" :items="items_move" :rows-per-page=5 :hide-rows-per-page=true :search-field="searchMoveField" :search-value="searchMovePj">
            <template #item-id="item">
             <v-checkbox v-model="sel_project_dest" :value="item.id" hide-details />
            </template>
          </EasyDataTable>
      </div>
      <div class="actions">
        <v-btn color="success" size="small" @click="submitMoveBtnClick">Submit</v-btn>
        <v-btn class="ml-2" @click="dialogState = false" size="small">Close</v-btn>
      </div>
    </div>
  </GDialog>
 </template>
 
 <script>
 import EasyDataTable from 'vue3-easy-data-table';
 import 'vue3-easy-data-table/dist/style.css';
 import ReuseApi from '../../services/ReuseApi'
 import ProjectApi from '../../services/ProjectApi'
 import DeviceMgmtApi from '../../services/DeviceMgmtApi'
 import LoginApi from '../../services/LoginApi'
 import { GDialog } from 'gitart-vue-dialog'
 import {mapState, mapGetters} from 'vuex'
 
 export default {
   components: {
     EasyDataTable,
     GDialog
   },
   computed: {
    projectId() { return this.$store.state.project.projectId; }
   },
   watch: {
    $route (to, from){
      this.loadInfo(this.unlistId);
    }
   },
   data() {
     return {
       pageType: "",
       searchMoveField: ["name"],
       searchMovePj: "",
       sel_device_from: "",
       sel_project_dest: "",
       dialogState: false,
       headers: [
         { text: "Type", value: "type" },
         { text: "Device Name", value: "device_name" },
         { text: "IMEI", value: "imei" },
         { text: "Non Mobile", value: "none_mobile" },
         { text: "Customer Site Code", value: "addr" },
         { text: "Region", value: "region" },
         { text: "Last Update", value: "last_update" },
         { text: "Action", value: "action" }
       ],
       items: [],
       serveSideloading: true,
       serverOptions: {
         page: 1,
         rowsPerPage: 10,
         sortBy: 'id',
         sortType: 'desc',
       },
       serverItemsLength: 0,
       headers_move: [
         { text: "", value: "id" },
         { text: "Project Name", value: "name" },
       ],
       items_move: [],
       currentDashboard: "",
       unlistId: "4d0ff930-47fa-11ea-a273-af1ea815a866",
     }
   },

   methods: {
    submitMoveBtnClick(){

      let _res = {};
      _res.deploy = 0; 
      ReuseApi.SetServerScope(this.sel_device_from, _res).then( (res2) => {} );

      let payload = this.sel_project_dest + "/device/" + this.sel_device_from;
      ProjectApi.MoveDeviceToNewProject(payload)
        .then(response => {
          this.$swal.fire({ icon: 'success', title: 'Success!', text: "Complete" });
          this.loadInfo(this.unlistId);
          this.dialogState = false;
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire({ icon: 'error', title: 'Error!', text: "Something Wrong" });
          this.loadInfo(this.unlistId);
          this.dialogState = false;
        });
    },
    moveBtnClick(item){
      this.sel_device_from = item.device_id;
      this.dialogState = true;
    },
     loadInfo(newProjectId) {

      let types = 'All';
      switch(this.$route.params.types) {
          case 'abox':
            types = 'A-Box'
            break;
          case 'wbox':
            types = 'W-Box'
            break;
          case 'thbox':
            types = 'TH-Box'
            break;
          case 'vabox':
            types = 'VA-Box'
            break;
          case 'rbox':
            types = 'R-Box'
            break;
          default:
            types = "All";
        }
        this.pageType = types;

       this.serveSideloading = true;
       DeviceMgmtApi.DeviceList(newProjectId, this.pageType)
         .then(response => {
           console.log(response.data);
           response.data.forEach((ele,index) => {
                ele.last_update = (new Date(parseInt(ele.last_update))).toLocaleString();
           });
           this.serverItemsLength = response.data.length;
           this.items = response.data;
           this.serveSideloading = false;
         })
         .catch(err => {
           console.log(err);
           this.items = [];
           this.serverItemsLength = 0;
           this.serveSideloading = false;
         });
 
       ProjectApi.PhpProjectList()
         .then(response => {
           this.items_move = response.data.filter(x => x.name != "INVENTORY" && x.name != "UNLIST" && x.name != "REUSE");
         })
         .catch(err => {
           console.log(err);
         });
     }
   },
   mounted() {
     this.loadInfo(this.unlistId);
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
   }
 }
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