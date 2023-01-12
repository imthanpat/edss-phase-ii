<template>
  <v-toolbar
    color="grey darken-4"
    style="background-color: rgb(72, 73, 71) !important; border-radius: 5px"
    class="mb-4"
  >
    <v-toolbar-title
      ><h6 class="text-h6" style="color: white">
        Activity Logs
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
    theme-color="#8DC73F"
  >
    <template #item-user_name="item">
      <strong>{{ item.user_name }}</strong>
    </template>
    <template #item-menu_sub="item">
      <strong>{{ item.menu_sub }}</strong>
    </template>
    <template #item-topic_l="item">
      <strong>{{ item.topic_l }}</strong>
    </template>
    <template #item-action_l="item">
        <v-chip size="small">{{ item.action_l }}</v-chip>
    </template>

    <template #item-status="item">
        <v-chip
        v-if="item.status == 'Error'"
        size="small"
        class="ma-2"
        color="error"
        label
        >{{ item.status }}</v-chip
      >
      <v-chip
        v-if="item.status == 'Success'"
        size="small"
        class="ma-2"
        color="success"
        label
        >{{ item.status }}</v-chip
      >
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
      // Activity Logs
      LoginApi.ActivityLogs()
        .then((res) => {
          this.storeItems = res;
          this.items = res;
          this.serverItemsLength = this.items.length;
          this.serveSideloading = false;
        })
        .catch((err) => {
          console.log(err);
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
        { text: "Date Activity", value: "date_c" },
        { text: "Username", value: "user_name" },
        { text: "Menu", value: "menu_sub" },
        { text: "Topic", value: "topic_l" },
        { text: "Action", value: "action_l" },
        { text: "Status", value: "status" },
        { text: "Description", value: "description" },
      ],
      items: [],
      storeItems: [],
    };
  },
  watch: {
    searchTxt(newVal) {
      let _filter = this.storeItems;
      _filter = _filter.filter((x) =>
        x.user_name.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
        x.menu_sub.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
        x.topic_l.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
        x.description.toLowerCase().includes(this.searchTxt.toLowerCase())
      );
      this.items = _filter;
    },
  },
  mounted() {
    this.loadInfo();
  },
};
</script>
