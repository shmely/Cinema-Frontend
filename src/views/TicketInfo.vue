<template>
  <div class="ticket-info-cont flex align-center">
    <div class="ticket-info-form flex justify-center align-center">
      <form v-if="selectedMovie">
        <h3>Tickets Info</h3>
        <div class="form-group">
          <label>Movie Name</label>
          <input
            type="text"
            readonly
            class="form-control form-control-lg"
            v-model="selectedMovie.title"
          />
        </div>
        <div class="form-group">
          <label for="example-datepicker">Select Movie Date</label>
          <b-form-datepicker
            required
            id="example-datepicker"
            @change="onTimeDateChanged"
            v-model="movieDate"
            class="mb-2"
          ></b-form-datepicker>
        </div>
        <div class="form-group">
          <label for="example-datepicker">Select Movie Time</label>
          <b-form-select
            required
            v-model="timeSelected"
            @change="onTimeDateChanged"
            :options="timeOptions"
          ></b-form-select>
        </div>
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" required class="form-control form-control-lg" v-model="fullName" />
        </div>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" required class="form-control form-control-lg" v-model="email" />
        </div>
        <div class="form-group">
          <label>Number of Tickets</label>
          <b-form-input
            id="test"
            type="number"
            required
            class="form-control form-control-lg"
            min="0"
            :max="availableTickets"
            v-model="numOfTickets"
          ></b-form-input>
          <strong
            :hidden="isTicketsValid"
            style="color: red;"
          >please choose number of tickets between 1 to {{availableTickets}}</strong>

          <div v-if="show" class="form-group">
            <label v-show="false">show:</label>
            <input
              v-show="false"
              type="text"
              readonly
              class="form-control form-control-lg"
              v-model="show._id"
            />
          </div>
        </div>
        <div class="flex space-between">
          <button class="btn_prev" @click="prev">Prev</button>
          <button class="btn_next" :disabled="isFormValid" @click="next">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Movie } from "../services/Movie";
import { Show, SeatState, Seat } from "../services/Theater";

@Component({
  components: {},
})
export default class TicketInfo extends Vue {
  fullName = "";
  email = "";
  availableTickets = 1;
  movieDate: Date = new Date();
  timeOptions: string[] = [
    "10:00",
    "15:00",
    "17:00",
    "19:00",
    "21:00",
    "23:00",
  ];
  timeSelected = "";
  numOfTickets = 1;
  get show() {
    const show: Show = this.$store.getters.currShow;
    if (show) {
      show.theater.seats.forEach((seat: Seat) => {
        if (seat.state === SeatState.Selected) seat.state = SeatState.Available;
      });
      this.availableTickets = show.theater.seats.filter(
        (seat) => seat.state === SeatState.Available
      ).length;
    }
    return show;
  }

  get isFormValid() {
    if (this.fullName.length < 3) return true;
    if (this.numOfTickets >= this.availableTickets || this.numOfTickets <= 0)
      return true;

    const regexpEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
    if (!regexpEmail.test(this.email)) return true;
    if (!this.show) return true;
    if (this.timeSelected.length < 4) return true;
    if (this.movieDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))
      return true;
    return false;
  }

  get isTicketsValid() {
    if (this.numOfTickets <= this.availableTickets && this.numOfTickets > 0)
      return true;
    return false;
  }

  get selectedMovie(): Movie {
    return this.$store.getters.currMovie;
  }
  async created() {
    const movieId = this.$route.query.movieId;
    await this.$store.dispatch({ type: "getMovie", movieId });
  }
  async onTimeDateChanged() {
    if (this.timeSelected && this.movieDate) {
      try {
        await this.$store.dispatch({
          type: "getShow",
          theaterId: this.selectedMovie.theaterId,
          movieId: this.selectedMovie._id,
          date: this.movieDate,
          time: this.timeSelected,
        });
      } catch (error) {
        alert(error);
      }
    }
  }

  next() {
    // this.$store.dispatch({
    //   type: "saveCustomer",
    //   email: this.email,
    //   name: this.fullName,
    // });
    this.$router.push({
      path: "selectseats",
      query: {
        numberOfTickets: this.numOfTickets.toString(),
      },
    });
  }
  prev() {
    this.$router.push({ path: "/" });
  }
}
</script>

<style>
</style>