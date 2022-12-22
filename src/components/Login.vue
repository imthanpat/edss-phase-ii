<template>
  <v-container class="fill-width fill-height bgg">
    <v-row class="align-center justify-center fill-height" dense>
      <v-col cols="12" sm="8" md="8" lg="4">
        <v-card class="pa-16 elevation-6" style="opacity: 0.9">
          <div class="text-center mb-5">
            <h4 class="text-h4">Enterprise Data Service</h4>
            <h5 class="text-subtitle-1">
              IoT Operation Platform<v-badge
                color="black"
                content="dev-phase-ii"
                inline
              >
              </v-badge>
            </h5>
          </div>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Enter your username"
                name="email"
                prepend-inner-icon="mdi-email"
                type="email"
                class="rounded-0"
                outlined
                v-model="uname"
                @keyup.enter="auth"
              >
              </v-text-field>
              <v-text-field
                label="Enter your password"
                name="password"
                prepend-inner-icon="mdi-lock"
                type="password"
                outlined
                v-model="pwd"
                @keyup.enter="auth"
              ></v-text-field>
              <v-btn block color="success" @click="auth"> Sign In </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LoginApi from "../services/LoginApi";
export default {
  name: "Login",
  data() {
    return {
      dialog: false,
      uname: "",
      pwd: "",
    };
  },
  methods: {
    singleMovie(id) {
      this.$router.push("/movie/" + id);
    },
    auth() {
      if (this.uname == "" || this.pwd == "") {
        this.$swal.fire({
          icon: "error",
          title: "Error",
          text: "User or Password Is Empty",
        });
      } else {
        LoginApi.AuthenEDSS({ username: this.uname, password: this.pwd })
          .then((response) => {
            localStorage.setItem("username", this.uname);
            localStorage.setItem("token", response.token);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.removeItem("current_pj");

            // User Info
            LoginApi.AuthenEDSS({
              username: "sysadmin@iotp.org",
              password: "sysadmin",
            })
              .then((_response) => {
                LoginApi.UserList(
                  _response.token,
                  process.env.VUE_APP_TENANTID,
                  this.uname
                )
                  .then((res) => {
                    let ele = res.data[0];
                    let _info = ele.additionalInfo.description.split(":");
                    let _level = _info[0];
                    let _pjId = _info[1];

                    localStorage.setItem("level", _level);
                    localStorage.setItem("pjId", _pjId);

                    this.$router.push("/device/all");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((error) => {
                console.log(error);
              });

            
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Authentication failed",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.bgg {
  background: url("https://picsum.photos/1920/1080?random") 50% 50% no-repeat;
  background-size: cover;
  opacity: 0.9;
  max-width: none;
}
</style>
