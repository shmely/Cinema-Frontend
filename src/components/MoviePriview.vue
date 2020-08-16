<template>
  <div v-if="movie" class="movie flex column">
    <router-link :to="{path: `/moviedetails/${movie._id}`}">
      <img :src="movie.img" />
    </router-link>
    <div class="rate flex">
      <b-icon-star-fill variant="warning"></b-icon-star-fill>
      <p>{{movie.rate}}</p>
    </div>
    <button @click="onOrderTickets" class="order-tickets">ORDER TICKETS</button>
    <button class="edit-user" @click="editMovie" v-if="user">Edit Movie</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Movie } from "../services/Movie";
import { Prop } from "vue-property-decorator";
import { BIcon, BIconStarFill } from "bootstrap-vue";
import { User } from "@/services/User";

@Component({
  components: {
    BIcon,
    BIconStarFill,
  },
})
export default class MoviePriview extends Vue {
  @Prop() movie!: Movie;

  get user(): User {
    return this.$store.getters.currUser;
  }
  editMovie() {
    this.$router.push({
      path: `movie/${this.movie._id}`,
    });
  }
  onOrderTickets() {
    this.$router.push({
      path: "ticketInfo",
      query: { movieId: this.movie._id },
    });
  }
}
</script>