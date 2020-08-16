<template>
  <nav class="flex align-center space-between">
    <div class="flex align-center space-between">
      <router-link to="/">
        <div class="logo">MOVIE-MAX.</div>
      </router-link>
      <router-link to="/">
        <span>Home</span>
      </router-link>
    </div>
    <div class="flex align-center space-between">
      <router-link to="/movie">
        <span v-if="user">Add movies</span>
      </router-link>
      <div class="flex align-center" @click="goToLogin">
        <BIconPersonSquare v-if="user" class="login" variant="warning"></BIconPersonSquare>
        <span v-if="!user">Admin Login</span>
        <span v-if="user">Admin Logout</span>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { BIcon, BIconPersonSquare } from "bootstrap-vue";
import { User } from "@/services/User";

@Component({
  components: {
    BIcon,
    BIconPersonSquare,
  },
})
export default class NavBar extends Vue {
  goToLogin() {
    if (!this.user) {
      this.$router.push("/login");
    } else {
      sessionStorage.removeItem("user");
      this.$store.dispatch({ type: "logout" });
    }
  }
  get user(): User {
    return this.$store.getters.currUser;
  }
}
</script>
<style>
</style>