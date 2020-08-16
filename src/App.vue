<template>
  <div id="app">
    <NavBar></NavBar>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>-->

    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import NavBar from "../src/components/NavBar.vue";
export default Vue.extend({
  components: {
    NavBar,
  },
});
</script>

<style>
</style>
