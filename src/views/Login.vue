<template>
  <div v-if="!user" class="login-root flex align-center justify-center">
    <div class="login-cont flex align-center justify-center">
      <div class="login">
        <h3>Sign In</h3>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control form-control-lg" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control form-control-lg" v-model="password" />
        </div>
        <button @click="login" class="btn btn-dark btn-lg btn-block">Sign In</button>
      </div>
    </div>
  </div>
  <div v-else v-bind="redirect()"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { User } from "@/services/User";

@Component({
  components: {},
})
export default class Login extends Vue {
  email?: string = "shmely@gmail.com";
  password?: string = "123456";

  get user(): User {
    return this.$store.getters.currUser;
  }
  redirect() {
    this.$router.push("/");
  }

  async login() {
    await this.$store.dispatch({
      type: "login",
      email: this.email,
      password: this.password,
    });
  }
}
</script>

<style>
</style>