<template>
  <div style="background-color: #fff6f6; height: 100vh">
    <!-- Header Starts -->
    <app-header />
    <!-- Header Ends -->

    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/global/AppHeader.vue";
export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>
