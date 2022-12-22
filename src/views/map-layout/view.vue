<template style="height: 100%;">
  <div
    align="center"
    justify="center"
    style="
      position: fixed;
      top: 50%;
      left: 60%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
    "
  >
    <div v-if="found == false">
      <p class="text-h5">No Data Information</p>
      <p class="text-overline">
        Sory, Map layout feature available only TH-Box project.
      </p>
    </div>
  </div>

  <iframe
      v-if="found == true"
      style="width: -webkit-fill-available; height: 100%"
      frameborder="0"
      :src="currentDashboard"
    ></iframe>
</template>
<script>
import ProjectApi from "../../services/ProjectApi";
export default {
  computed: {
    projectId() {
      return this.$store.state.project.projectId;
    },
  },
  data() {
    return {
      currentDashboard: "",
      found: false,
    };
  },
  watch: {
    projectId(newvalue, oldvalue) {
      ProjectApi.GetListScope(newvalue)
        .then((response) => {
          let _mapUrl = response.find((o) => o.key === "map-url");
          let _thStatus =
            response.find((o) => o.key === "TH-Box").value == true ||
            response.find((o) => o.key === "TH-Box").value == "true"
              ? true
              : false;
          if (_thStatus) {
            const HOSTNAME = process.env.VUE_APP_ENDPOINT;
            let _path = _mapUrl.value
                  .split("/dashboards/")
                  .slice(-1)[0];
            this.currentDashboard = HOSTNAME + '/dashboards/' +  _path;
            this.found = true;
          } else {
            this.found = false;
          }
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
  },
  mounted() {},
};
</script>
