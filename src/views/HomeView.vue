<template>
  <HelloWorld />
  <Sidebar/>
</template>

<script>
import { defineComponent } from "vue";

// Components
import HelloWorld from "../components/HelloWorld.vue";
import Sidebar from "../components/shared/Sidebar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
    Sidebar
  },
});
</script>
