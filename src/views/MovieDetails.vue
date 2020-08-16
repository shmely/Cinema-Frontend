<template>
  <section v-if="movie" class="movie-details flex column">
    <div class="title">{{movie.title}}</div>
    <div class="content flex">
      <div>
        <div class="img-cont">
          <img :src="movie.img" />
        </div>
      </div>
      <div class="details flex wrap">
        <b-icon-clock variant="danger"></b-icon-clock>
        <span>{{movie.length}}</span>
        <b-icon-star-fill class="icon" variant="warning"></b-icon-star-fill>
        <span>{{movie.rate}}</span>
        <span>Year:</span>
        <span>{{movie.year}}</span>
      </div>
      <iframe width="700" height="400" :src="movie.trailer"></iframe>
      <div class="flex">
        <span>{{movie.desc}}</span>
      </div>
      <button class="order-tickets">ORDER TICKETS</button>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Movie } from "../services/Movie";
import Component from "vue-class-component";
import { BIcon, BIconClock } from "bootstrap-vue";
@Component({
  components: {
    BIcon,
    BIconClock,
  },
})
export default class MovieDetails extends Vue {
  async created() {    
    const movieId = this.$route.params.id;
    await this.$store.dispatch({ type: "getMovie", movieId });
  }

  get movie(): Movie {
    return this.$store.getters.currMovie;
  }
}
</script>