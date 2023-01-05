<template style="height: 100%;" height="inherit">
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

  <div style="height: 100vh!important;">
    <iframe
      v-if="found == true"
      class="iframe-full"
      frameborder="0"
      :src="currentDashboard"
    ></iframe>
  </div>

  
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
      this.loadInfo(newvalue);
    },
  },
  methods: {
    loadInfo(projectId){
      ProjectApi.GetListScope(projectId)
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
    }
  },
  mounted() {
    this.loadInfo(this.projectId);
  },
};
</script>
<style scoped>
.iframe-full {
  width: -moz-available !important;
  width: -webkit-fill-available !important;

  height: 100% !important;
  height: -webkit-fill-available !important;
}</style>
