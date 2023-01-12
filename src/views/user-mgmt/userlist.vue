<template>
  <v-toolbar
    color="grey darken-4"
    style="background-color: rgb(72, 73, 71) !important; border-radius: 5px"
    class="mb-4"
  >
    <v-toolbar-title
      ><h6 class="text-h6" style="color: white">
        User Managements
      </h6></v-toolbar-title
    >
    <v-spacer></v-spacer>
  </v-toolbar>
  <div style="display: flex" lign="center">
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
    theme-color="#8DC73F"
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
  <GDialog max-width="1200" height="inherit" v-model="editDialog" scrollable>
    <v-card width="inherit" class="mx-auto">
      <v-toolbar
        color="grey darken-4"
        style="background-color: rgb(72, 73, 71) !important"
      >
        <v-toolbar-title
          ><h6 class="text-h6" style="color: white">
            <v-icon color="white" size="small"> mdi-pencil </v-icon> Edit User
          </h6></v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text
        style="
          width: -webkit-fill-available;
          height: -webkit-fill-available;
          padding: 0px;
          overflow-y: scroll;
        "
      >
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
                      v-model="editModel.level"
                      label="Level*"
                      :items="['admin', 'user']"
                      variant="solo"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center" v-if="!editModel.manageAll">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Manage Projects</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="editModel.pjName"
                      :items="projects"
                      label="Manage Projects*"
                      multiple
                      persistent-hint
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    Manage All Project
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-checkbox
                      v-model="editModel.manageAll"
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
                      v-model="editModel.username"
                      label="Email*"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">Password</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editModel.password"
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
                      v-model="editModel.confirmPassword"
                      label="Project*"
                      :type="'password'"
                    ></v-text-field>
                  </v-col>
                </v-row> -->
              </v-col>
              <v-col cols="6">
                <v-row class="justify-center align-center">
                  <v-col cols="12" sm="4" class="text-right">
                    <span class="text-overline">FirstName</span>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editModel.firstName"
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
                      v-model="editModel.lastName"
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
                      v-model="editModel.dept"
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
                      v-model="editModel.tel"
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
                      v-model="editModel.enable"
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

        <v-row class="mt-0 pl-12 pr-12 mb-12">
          <v-col cols="12" sm="12" class="text-right mr-10">
            <v-btn
              color="success"
              :disabled="disableEditSave"
              @click="editSave()"
            >
              <span style="color:white;">Submit</span>
            </v-btn>
            <v-btn
              color="default"
              class="ml-4"
              @click="this.editDialog = false"
            >
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </GDialog>
</template>

<script>
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import LoginApi from "../../services/LoginApi";
import { GDialog } from "gitart-vue-dialog";
import ProjectApi from "../../services/ProjectApi";

export default {
  components: {
    EasyDataTable,
    GDialog,
  },
  methods: {
    delBtnClick(item) {
      var self = this;
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You want Delete This User ?",
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
              LoginApi.DeleteUser(item.id).then();
              this.$swal.fire({
                icon: "success",
                title: "Success!",
                text: "Complete",
              });
              self.loadInfo();
            }
          });
    },
    editSave(){
      this.editPayload.id.id = this.editModel.id;
      this.editPayload.email = this.editModel.username;
      this.editPayload.firstName = this.editModel.firstName;
      this.editPayload.lastName = this.editModel.lastName;

      let _tmpSelProject = [];
      let _tmpSelProjectName = [];
      let _selProject = this.projects.filter(x => this.editModel.pjName.includes(x.name));
      _selProject.forEach(x => { _tmpSelProject.push(x.id.id); _tmpSelProjectName.push(x.name); });

      let _description = [];
      _description[0] = this.editModel.level;
      _description[1] = _tmpSelProject.join(',');
      _description[2] = this.editModel.dept;
      _description[3] = this.editModel.tel;
      _description[4] = localStorage.getItem("username") + " " + new Date().toLocaleDateString("en-US");
      _description[5] = this.editModel.enable;
      _description[6] = _tmpSelProjectName.join(',');

      this.editPayload.additionalInfo.description = _description.join(':');
      console.log(this.editPayload);

      LoginApi.AuthenEDSS({
        username: "sysadmin@iotp.org",
        password: "sysadmin",
      })
        .then((response) => {
          LoginApi.EditUser(response.token, this.editPayload)
            .then((_res) => {
              console.log(_res);


              // Activate
              // http://182.52.50.211:18080/api/user/52da7320-834a-11ed-a2c8-b55147006237/activationLink [GET]
              // http://182.52.50.211:18080/api/noauth/activate?activateToken=cfqYcPDQmJaP0YuiiAr15C9GR32dJA

              // http://182.52.50.211:18080/api/noauth/activate [POST]
              // {
              //   "activateToken": "cfqYcPDQmJaP0YuiiAr15C9GR32dJA",
              //   "password": "123456"
              // }
               this.$swal.fire({
                icon: "success",
                title: "Success!",
                text: "Complete",
              });
              this.editDialog = false;
              this.loadInfo();
            })
            .catch((_err) => {
              console.log(_err);
              this.$swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something Wrong",
              });
              this.editDialog = false;
              this.loadInfo();
            });
        })
        .catch((error) => {
          console.log(error);
        });

    },
    editInfo(item) {
      this.editModel.id = item.id;
      this.editModel.level = item.level;
      this.editModel.firstName = item.firstName;
      this.editModel.lastName = item.lastName;
      this.editModel.dept = item.dept;
      this.editModel.tel = item.tel;
      this.editModel.username = item.username;
      this.editModel.enable = item.enable ? "enable" : "disable";
      this.editModel.pjName = item.pjName.split(",");

      this.editModel.manageAll =  this.editModel.pjName.length == this.projects;

      this.tmpEditModel = JSON.stringify({ ...this.editModel });
      this.editDialog = true;
    },
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
                  _item.id = ele.id.id;
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

              console.log(_tmpItem);

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
      valid: true,
      disableEditSave: true,
      editDialog: false,
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
      valid: true,
      tab: null,
      projects: null,
      tmpEditModel: null,
      editModel: {
        id: null,
        level: null,
        pjId: [],
        firstName: null,
        lastName: null,
        dept: null,
        tel: null,
        enable: null,
        manageAll: false,
      },
      editPayload: {
        id: {
          entityType: "USER",
          id: "userId"
        },
        email: "username",
        firstName: "firstname",
        lastName: "lastname",
        additionalInfo: {
          description: "allInfo"
        },
        authority: "TENANT_ADMIN",
        customerId: {
          entityType: "CUSTOMER",
          id: "13814000-1dd2-11b2-8080-808080808080"
        }
      }
    };
  },
  watch: {
    searchTxt(newVal) {
      let _filter = this.storeItems;
      _filter = _filter.filter((x) =>
        x.username.toLowerCase().includes(this.searchTxt.toLowerCase())
      );
      this.items = _filter;
    },
    editModel: {
      handler(newVal, oldVal) {
        this.disableEditSave =
          JSON.stringify({ ...newVal }) === this.tmpEditModel;
      },
      deep: true,
    },
    "editModel.manageAll"(isCheck){
      if(isCheck){
        let _tmpSelProjectId = [];
        let _tmpSelProjectName = [];
        this.projects.forEach(x => { _tmpSelProjectId.push(x.id.id); _tmpSelProjectName.push(x.name); });
        this.editModel.pjName = _tmpSelProjectName;
        this.editModel.pjId = _tmpSelProjectId;
      }else{
        this.editModel.pjName = [];
        this.editModel.pjId = [];
      }
    }
  },
  mounted() {
    // Select Project
    ProjectApi.GetProjectList()
      .then((response) => {
        this.projects = response.data;
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

    this.loadInfo();
  },
};
</script>
