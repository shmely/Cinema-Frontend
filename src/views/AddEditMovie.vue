<template>
  <section class="add-edit-movie">
    <form class="form-horizontal">
      <fieldset>
        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="id">Id</label>
          <div class="col-md-6 offset-md-3">
            <input
              id="id"
              name="id"
              type="text"
              readonly
              v-model="movie._id"
              class="form-control input-md"
            />
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="Title">Title</label>
          <div class="col-md-6 offset-md-3">
            <input
              id="Title"
              name="Title"
              type="text"
              class="form-control input-md"
              v-model="movie.title"
              required
            />
          </div>
        </div>

        <!-- Textarea -->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="Description">Description</label>
          <div class="col-md-6 offset-md-3">
            <textarea class="form-control" id="Description" v-model="movie.desc" name="Description"></textarea>
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="img">Image Link</label>
          <div class="col-md-6 offset-md-3">
            <input
              id="img"
              name="img"
              type="text"
              v-model="movie.img"
              class="form-control input-md"
            />
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="trailer">Trailer Link</label>
          <div class="col-md-6 offset-md-3">
            <input
              id="trailer"
              name="trailer"
              type="text"
              v-model="movie.trailer"
              class="form-control input-md"
            />
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="year">Movie Year</label>
          <div class="col-md-6 offset-md-3">
            <input
              id="year"
              name="year"
              type="text"
              v-model="movie.year"
              class="form-control input-md"
              required
            />
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="year">Rate</label>
          <div class="col-md-6 offset-md-3">
            <input
              id="rate"
              name="rate"
              type="text"
              v-model="movie.rate"
              class="form-control input-md"
              required
            />
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="length">Movie Length</label>
          <div class="col-md-6 offset-md-3">
            <input
              id="length"
              name="length"
              type="text"
              v-model="movie.length"
              class="form-control input-md"
            />
          </div>
        </div>

        <!-- Select Basic -->
        <div class="form-group">
          <label class="col-md-6 offset-md-3 control-label" for="Theater">Theater</label>
          <div class="col-md-6 offset-md-3">
            <select id="Theater" v-model="movie.theaterId" name="Theater" class="form-control">
              <option selected value>Not Selcted</option>
              <option
                v-for="theater in theaters"
                :value="theater._id"
                :key="theater.id"
              >{{theater.name}}</option>
            </select>
          </div>
        </div>
        <!-- Button -->
        <div class="form-group">
          <div class="col-md-6 offset-md-3">
            <button
              id="singlebutton"
              @click.prevent="save"
              name="singlebutton"
              class="btn btn-primary"
            >Save</button>
          </div>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Movie } from "../services/Movie";
import Component from "vue-class-component";
import { BIcon, BIconClock } from "bootstrap-vue";
import { TheaterMap } from "@/services/Theater";
import { TheaterService } from "@/services/theater.service";
@Component({
  components: {
    BIcon,
    BIconClock,
  },
})
export default class AddEditMovie extends Vue {
  private theaterService: TheaterService = new TheaterService();
  async created() {
    const movieId = this.$route.params.id;
    if (movieId) await this.$store.dispatch({ type: "getMovie", movieId });
    await this.$store.dispatch({ type: "getTheaters" });
  }
  get movie(): Movie {
    if (!this.$route.params.id) {
      return this.theaterService.getEmptyMovie();
    } else return this.$store.getters.currMovie;
  }

  get theaters(): TheaterMap {
    return this.$store.getters.theaters;
  }

  async save() {
    try {
      await this.$store.dispatch({ type: "saveMovie", movie: this.movie });
      this.$router.push({
        path: "/",
      });
    } catch (error) {
      alert(error);
    }
  }
}
</script>