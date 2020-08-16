<template>
  <main class="home flex column justfiy-center align-center">
    <h1>Current Movies</h1>
    <div class="movies">
      <MoviePriview v-bind:movie="movie" v-for="movie in movies" :key="movie._id"></MoviePriview>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CarouselPlugin } from "bootstrap-vue";
import MoviePriview from "../components/MoviePriview.vue";
import { Movie } from "../services/Movie";

Vue.use(CarouselPlugin);
@Component({
  components: {
    MoviePriview,
  },
})
export default class Home extends Vue {
  constructor() {
    super();
  }

  async created() {
    await this.$store.dispatch({ type: "getMovies" });
  }
  get movies(): Movie[] {
    const movs: Movie[] = this.$store.getters.movies;
    return movs;
  }
}
</script>
