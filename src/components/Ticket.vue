<template>
  <div class="cardWrap">
    <div class="card cardLeft">
      <p>
        Movie
        <span>Max</span>
      </p>
      <div class="name">
        <p>{{ticket.movieName}}</p>
        <p>
          <span>movie</span>
        </p>
      </div>
      <div class="name">
        <p>{{ticket.date}}</p>
        <p>
          <span>date</span>
        </p>
      </div>
      <div class="flex space-between">
        <div class="name">
          <p>{{seat}}</p>
          <p>
            <span>seat</span>
          </p>
        </div>
        <div class="name">
          <p>{{ticket.time}}</p>
          <p>
            <span>time</span>
          </p>
        </div>
        <div class="name">
          <p>{{ticket.hall}}</p>
          <p>
            <span>hall</span>
          </p>
        </div>
      </div>
    </div>
    <div class="card cardRight">
      <div class="eye"></div>
      <div class="right">
        <p>{{seat}}</p>
        <p>
          <span>seat</span>
        </p>
      </div>
      <div class="barcode"></div>
    </div>
  </div>
</template>

// <script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { CinemaTicket } from "../services/CinemaTicket";

@Component({
  components: {},
})
export default class Ticket extends Vue {
  @Prop() ticket!: CinemaTicket;

  get seat() {
    return `Line: ${this.ticket.seat.location.y} Chair: ${this.ticket.seat.location.x}`;
  }
}

//
</script>

<style>
</style>