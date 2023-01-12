<template>
  <v-card width="inherit" class="mx-auto">
    <v-toolbar
      color="grey darken-4"
      style="background-color: rgb(72, 73, 71) !important"
    >
      <v-toolbar-title
        ><h6 class="text-h6" style="color: white">
          <v-icon color="white" size="small"> mdi-plus </v-icon> Add / Import
          User
        </h6></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text
      style="
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        padding: 0px;
      "
      overflow-y="scorll"
    >
      <v-form ref="form" v-model="valid" lazy-validation>
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
                    :rules="[(v) => !!v || 'Level is required']"
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
                    :rules="[(v) => !!v || 'Projects is required']"
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
                    :rules="[(v) => !!v || 'Email is required']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center align-center">
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
              </v-row>
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
                    :rules="[(v) => !!v || 'FirstName is required']"
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
                    :rules="[(v) => !!v || 'LastName is required']"
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
                    :rules="[(v) => !!v || 'Department is required']"
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
                    :rules="[(v) => !!v || 'Tel is required']"
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
                    :rules="[(v) => !!v || 'Status is required']"
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
            @click="validate()"
          >
            <span style="color:white;">Submit</span>
          </v-btn>
          <v-btn color="default" class="ml-4" @click="reset()"> Reset </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import ProjectApi from "../../services/ProjectApi";
import LoginApi from "../../services/LoginApi";

export default {
  data() {
    return {
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
        confirmPassword: null,
        password: null,
      },
      editPayload: {
        email: "username",
        firstName: "firstname",
        lastName: "lastname",
        additionalInfo: {
          description: "allInfo",
        },
        authority: "TENANT_ADMIN",
        customerId: {
          entityType: "CUSTOMER",
          id: "13814000-1dd2-11b2-8080-808080808080",
        },
      },
    };
  },
  watch: {
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
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (this.editModel.password != this.editModel.confirmPassword) {
          this.$swal.fire({
            icon: "warning",
            title: "Warning!",
            text: "Password Does Not Match",
          });
        } else {
          this.editSave();
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    editSave() {
      this.editPayload.email = this.editModel.username;
      this.editPayload.firstName = this.editModel.firstName;
      this.editPayload.lastName = this.editModel.lastName;

      let _tmpSelProject = [];
      let _tmpSelProjectName = [];
      let _selProject = this.projects.filter((x) =>
        this.editModel.pjName.includes(x.name)
      );
      _selProject.forEach((x) => {
        _tmpSelProject.push(x.id.id);
        _tmpSelProjectName.push(x.name);
      });

      let _description = [];
      _description[0] = this.editModel.level;
      _description[1] = _tmpSelProject.join(",");
      _description[2] = this.editModel.dept;
      _description[3] = this.editModel.tel;
      _description[4] = new Date().toLocaleDateString("en-US");
      _description[5] = this.editModel.enable;
      _description[6] = _tmpSelProjectName.join(",");

      this.editPayload.additionalInfo.description = _description.join(":");

      LoginApi.AuthenEDSS({
        username: "sysadmin@iotp.org",
        password: "sysadmin",
      })
        .then((response) => {
          LoginApi.EditUser(response.token, this.editPayload)
            .then((_res) => {
              let _userId = _res.id.id;

              LoginApi.ActivationLink(_userId)
                .then((r) => {
                  let activateToken = r.split("activateToken=").slice(-1)[0];

                  let _payloadActivate = {};
                  _payloadActivate.activateToken = activateToken;
                  _payloadActivate.password = this.editModel.password;
                  LoginApi.Activate(_payloadActivate)
                    .then((rx) => {
                      this.$swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Complete",
                      });
                      this.$router.push("/userlist");
                    })
                    .catch((ex) => {
                      console.log(ex);
                    });
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((_err) => {
              console.log(_err);
              this.$swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something Wrong",
              });
              this.editDialog = false;
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    //this.initPage();
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
  },
};
</script>
