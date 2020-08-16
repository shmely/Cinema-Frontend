<template>
  <div class="theater-cont flex align-center">
    <section v-if="show" class="theater_items flex column">
      <div class="theater_map" v-bind:style="theaterStyle">
        <div class="flex align-center justify-center" v-bind:style="screenStyle">Screen</div>
        <Chair
          v-bind:seat="seat"
          v-bind:numberOfTickets="numberOfTickets"
          v-bind:selectedSeats="selectedSeats"
          v-for="(seat,idx) in show.theater.seats"
          :key="idx"
          v-on:set-selected-seats="updateSeats"
        ></Chair>
      </div>
      <ul class="legend clean-list flex">
        <li>
          <div class="chair">
            <div class="inner-chair" style="background-color: #008000;"></div>
          </div>
          <span>Selected Seat</span>
        </li>
        <li>
          <div class="chair">
            <div class="inner-chair" style="background-color: #FF0000"></div>
          </div>
          <span>Reserved Seat</span>
        </li>
        <li>
          <div class="chair">
            <div class="inner-chair" style="background-color: #FFFFFF;"></div>
          </div>
          <span>Empty Seat</span>
        </li>
      </ul>
      <div class="flex space-between grow">
        <button class="btn_prev" @click="prev">Prev</button>
        <button class="btn_next" :disabled="isFormValid" @click="next">Next</button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Chair from "../components/Chair.vue";
import { SeatState, Seat, Show } from "@/services/Theater";
@Component({
  components: {
    Chair,
  },
})
export default class TheaterMap extends Vue {
  selectedSeats = 0;
  numberOfTickets!: number;
  updateSeats($event: number) {
    this.selectedSeats += $event;
  }
  //life cycle hooks
  async created() {
    this.numberOfTickets = +this.$route.query.numberOfTickets;
  }

  // computed properties

  get show(): Show {
    return this.$store.getters.currShow;
  }
  get theaterStyle() {
    return {
      "grid-template-columns": `repeat(${this.show.theater.width},20px`,
      "grid-template-rows": `repeat(${this.show.theater.height},20px`,
    };
  }
  get isFormValid(): boolean {
    return !(this.numberOfTickets === this.selectedSeats);
  }

  get screenStyle() {
    return {
      "background-color": "red",
      color: "white",
      "grid-column": `${this.show.theater.screen.point.x + 1} / span ${
        this.show.theater.screen.width
      }`,
      "grid-row": `${this.show.theater.screen.point.y} / span ${this.show.theater.screen.height}`,
    };
  }
  async next() {
    await this.$store.dispatch({ type: "saveShow", show: this.show });
    this.$router.push({
      path: "ticketspay",
      query: { movieId: this.show.movieId },
    });
  }
  destroy() {
    this.show.theater.seats.forEach((seat: Seat) => {
      if (seat.state === SeatState.Selected) seat.state = SeatState.Available;
    });
  }
  async prev() {
    await this.$store.dispatch({ type: "saveShow", show: this.show });
    this.$router.push({
      path: "ticketInfo",
      query: { movieId: this.show.movieId },
    });
  }
}
</script>

<style>
</style>