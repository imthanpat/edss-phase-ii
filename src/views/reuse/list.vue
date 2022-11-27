<template>
   <p class="text-left mt-2 mb-2"><span class="text-subtitle-2">Total Device(s) : </span><v-chip size="small">{{serverItemsLength}}</v-chip></p>
  <EasyDataTable style="overflow: hidden;text-overflow: ellipsis;" :rows-items=[10,25,50,100]
    v-model:server-options="serverOptions" :server-items-length="serverItemsLength" :loading="serveSideloading"
    :headers="headers" :items="items" buttons-pagination>
    <template #item-status_reuse="item">
      <v-chip class="ma-2" color="indigo" size="small" label>
        Reuse
      </v-chip>
    </template>
    <template #item-maintenance="item">
      <v-chip v-if="item.maintenance != 'true'" size="small" class="ma-2" color="teal" text-color="white"
        prepend-icon="mdi-checkbox-marked-circle">
        OK
      </v-chip>
      <v-chip v-if="item.maintenance == 'true'" size="small" class="ma-2"
        prepend-icon="mdi-alert-circle-outline">
        Maintanance
      </v-chip>
    </template>
    <template #item-action="item">
      <v-btn class="ma-2 sm-btn" variant="text" icon="mdi-arrow-right-bold-circle-outline" @click="moveBtnClick(item)">
      </v-btn>
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
import { GDialog } from 'gitart-vue-dialog'

export default {
  components: {
    EasyDataTable,
    GDialog
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
        { text: "Status", value: "status_reuse" },
        { text: "Device Status", value: "maintenance" },
        { text: "Type", value: "type" },
        { text: "Device Name", value: "device_name" },
        { text: "IMEI", value: "imei" },
        { text: "Non Mobile", value: "none_mobile" },
        { text: "Last Customer Site Code", value: "addr" },
        { text: "Region", value: "region" },
        { text: "Date First Install", value: "date_first_install" },
        { text: "Date In Stock", value: "date_in_stock" },
        { text: "Count", value: "reuse_count" },
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
    }
  },
  methods: {
    submitMoveBtnClick(){
      let payload = this.sel_project_dest + "/device/" + this.sel_device_from;
      ProjectApi.MoveDeviceToNewProject(payload)
        .then(response => {
          this.$swal.fire({ icon: 'success', title: 'Success!', text: "Complete" });
          this.loadInfo();
          this.dialogState = false;
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire({ icon: 'error', title: 'Error!', text: "Something Wrong" });
          this.loadInfo();
          this.dialogState = false;
        });
    },
    moveBtnClick(item){
      this.sel_device_from = item.device_id;
      this.dialogState = true;
    },
    loadInfo() {
      this.serveSideloading = true;
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
      ReuseApi.ReuseInfo(this.pageType)
        .then(response => {
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
  watch: {
    $route (to, from){
      this.loadInfo();
    }
  },
  mounted() {
    this.loadInfo();
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