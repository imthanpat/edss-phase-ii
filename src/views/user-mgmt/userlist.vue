<template>
  <v-toolbar
      color="grey darken-4"
      style="background-color: rgb(72, 73, 71) !important;border-radius: 5px;"
      class="mb-4"
    >
      <v-toolbar-title
        ><h6 class="text-h6" style="color: white">
          User Managements
        </h6></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>
  <div style="display: flex;" lign="center">
    <p class="text-left mt-5 mb-2">
      <span class="text-subtitle-2">Total Device(s) : </span
      ><v-chip size="small">{{ serverItemsLength }}</v-chip>
    </p>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="searchTxt"
      :counter="255"
      label="Text Search"
      required
    ></v-text-field>
  </div>

  <EasyDataTable
    style="white-space: nowrap"
    :rows-per-page="10"
    :rows-items="[10, 25, 50, 100]"
    :loading="serveSideloading"
    :headers="headers"
    :items="items"
    buttons-pagination
  >
    <template #item-username="item">
      <strong>{{ item.username }}</strong>
    </template>
    <template #item-level="item">
      <v-chip
        v-if="item.level == 'admin'"
        size="small"
        class="ma-2"
        color="success"
        >Admin</v-chip
      >
      <v-chip
        v-if="item.level == 'superadmin'"
        size="small"
        class="ma-2"
        color="warning"
        >Superadmin</v-chip
      >
      <v-chip v-if="item.level == 'user'" size="small" class="ma-2" color="info"
        >User</v-chip
      >
    </template>
    <template #item-pjName="item">
      <strong>{{ item.pjName }}</strong>
    </template>
    <template #item-enable="item">
      <v-checkbox
        class="mb-0"
        v-model="item.enable"
        hide-details="true"
      ></v-checkbox>
    </template>
    <template #item-action="item">
      <v-btn-group rounded="x2" v-if="item.level != 'superadmin'">
        <v-btn size="small" icon="mdi-pencil" @click="editInfo(item)"></v-btn>
        <v-btn
          size="small"
          icon="mdi-trash-can"
          @click="delBtnClick(item)"
        ></v-btn>
      </v-btn-group>
    </template>
  </EasyDataTable>
</template>

<script>
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import LoginApi from "../../services/LoginApi";

export default {
  components: {
    EasyDataTable,
  },
  methods: {
    loadInfo() {
      this.serveSideloading = true;
      // User List
      LoginApi.AuthenEDSS({
        username: "sysadmin@iotp.org",
        password: "sysadmin",
      })
        .then((response) => {
          LoginApi.UserList(response.token, process.env.VUE_APP_TENANTID, "")
            .then((res) => {
              let _tmpItem = [];
              res.data.forEach((ele) => {
                if (ele.name != "tenant@iotp.org") {
                  let _item = {};
                  let _info = ele.additionalInfo.description.split(":");
                  _item.username = ele.name;
                  _item.level = _info[0];
                  _item.pjId = _info[1].split(",");
                  _item.firstName = ele.firstName;
                  _item.lastName = ele.lastName;
                  _item.dept = _info[2];
                  _item.tel = _info[3];
                  _item.lastupdate = _info[4];
                  _item.createdate = new Date(ele.createdTime).toLocaleString();
                  _item.enable = _info[5] == "enable" ? true : false;
                  _item.pjName = _info[6];
                  _tmpItem.push(_item);
                }
              });

              this.storeItems = _tmpItem;
              this.items = _tmpItem;
              this.serverItemsLength = this.items.length;
              this.serveSideloading = false;
            })
            .catch((err) => {
              console.log(err);
              this.serveSideloading = false;
            });
        })
        .catch((error) => {
          console.log(error);
          this.serveSideloading = false;
        });
    },
  },
  data() {
    return {
      searchTxt: "",
      serveSideloading: true,
      serverItemsLength: null,
      headers: [
        { text: "Username", value: "username" },
        { text: "Level", value: "level" },
        { text: "Projects", value: "pjName" },
        { text: "Last Modify / By", value: "lastupdate" },
        { text: "Create Date", value: "createdate" },
        { text: "Status", value: "enable" },
        { text: "Action", value: "action" },
      ],
      items: [],
      storeItems: [],
    };
  },
  watch: { 
    searchTxt(newVal){
      let _filter = this.storeItems;
      _filter = _filter.filter((x) =>
          x.username.toLowerCase().includes(this.searchTxt.toLowerCase())
      );
      this.items = _filter;
    }
  },
  mounted() {
    this.loadInfo();
  },
};
</script>
