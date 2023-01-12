<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    // var scripts = [
    //   "https://cdn.jsdelivr.net/npm/chart.js@2.9.3",
    //   "https://cdn.jsdelivr.net/npm/chartjs-plugin-piechart-outlabels@0.1.4/dist/chartjs-plugin-piechart-outlabels.min.js",
    //   "https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-doughnutlabel/2.0.3/chartjs-plugin-doughnutlabel.js",
    // ];
    // scripts.forEach((script) => {
    //   let tag = document.createElement("script");
    //   tag.setAttribute("src", script);
    //   document.head.appendChild(tag);
    // });
  },
  data: () => ({
    //
  }),
};
</script>
